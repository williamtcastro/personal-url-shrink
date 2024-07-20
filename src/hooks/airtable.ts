export interface TableItem {
  id: string;
  url: string;
  is_enabled: number;
}

interface AirTableTableItem {
  id: string;
  createdTime: string;
  fields: TableItem;
}
[];

interface AirTableHook {
  getTableContents: () => Promise<Map<string, AirTableTableItem>>;
  getRecordById: (id: string) => Promise<AirTableTableItem | undefined>;
  addToTable: (tableItem: TableItem) => void;
}

type AirTableRecordsResponse = {
  records: AirTableTableItem[];
};

const apiURL = process.env.AIRTABLE_API_URL;
const baseId = process.env.AIRTABLE_BASE_ID;
const tableId = process.env.AIRTABLE_TABLE_ID;

const useAirtable = (): AirTableHook => {
  const getTableContents = async () => {
    const recordsMap = new Map<string, AirTableTableItem>();

    const response = await fetch(
      `${apiURL}/${baseId}/${tableId}?maxRecords=100`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_PERSONAL_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    )
      .then(async (response) => {
        const { records } = (await response.json()) as AirTableRecordsResponse;

        records.forEach((record) => {
          recordsMap.set(record.fields.id, record);
        });
      })
      .catch((e) => console.error(e));

    return recordsMap;
  };

  const getRecordById = async (
    id: string
  ): Promise<AirTableTableItem | undefined> => {
    const records = await getTableContents();

    return records.get(id);
  };

  const addToTable = (tableItem: TableItem) => {};

  return {
    getTableContents,
    getRecordById,
    addToTable,
  };
};

export default useAirtable;
