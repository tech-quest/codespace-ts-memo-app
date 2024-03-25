import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/features/app/prisma';
import { DateUtils } from '~/features/app/utils';

export async function GET() {
  const records = await db.memo.findMany();

  const memos = records.map((memo) => {
    return {
      id: memo.id,
      title: memo.title,
      createdAt: DateUtils.formatDateInJa(memo.createdAt),
    };
  });

  return NextResponse.json({ data: memos });
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await request.json();

  const requiredMessage = '未入力の内容があります';

  if (title === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  if (content === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  const record = await db.memo.create({ data: { title, content } });

  return NextResponse.json({ data: { id: record.id.toString(10) } });
}
