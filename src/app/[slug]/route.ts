import useAirtable from '@/hooks/airtable';
import { NextResponse, NextRequest } from 'next/server';

export async function GET(
  _request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const airtable = useAirtable();
  const slug = params.slug;

  const record = await airtable.getRecordById(slug);

  if (!record || record.fields.is_enabled === 0)
    return NextResponse.json(
      {
        message: 'ID not found',
      },
      { status: 404 }
    );

  return NextResponse.redirect(record.fields.url);
}
