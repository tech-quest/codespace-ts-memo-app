import { NextRequest, NextResponse } from 'next/server';

import { db } from '~/features/app/prisma';
import { DateUtils } from '~/features/app/utils';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 404 });
  }

  const record = await db.memo.findUnique({ where: { id } });
  if (record === null) {
    return NextResponse.json({ error: { message: 'メモが見つかりませんでした' } }, { status: 404 });
  }

  const memo = {
    id: record.id,
    title: record.title,
    content: record.content,
    createdAt: DateUtils.formatDateInJa(record.createdAt),
    updatedAt: DateUtils.formatDateInJa(record.updatedAt),
  };

  return NextResponse.json({ data: memo });
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await request.json();

  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 400 });
  }

  const requiredMessage = '未入力の内容があります';

  if (title === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  if (content === '') {
    return NextResponse.json({ error: { message: requiredMessage } }, { status: 400 });
  }

  try {
    const record = await db.memo.update({ where: { id }, data: { title, content } });

    return NextResponse.json({ data: { id: record.id.toString(10) } });
  } catch {
    return NextResponse.json({ error: { message: 'データベース操作に失敗しました。' } }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (Number.isNaN(id)) {
    return NextResponse.json({ error: { message: 'ID 形式が不正な形式となっています' } }, { status: 404 });
  }

  try {
    const record = await db.memo.delete({ where: { id } });

    return NextResponse.json({ data: { id: record.id.toString(10) } });
  } catch {
    return NextResponse.json({ error: { message: 'データベース操作に失敗しました。' } }, { status: 500 });
  }
}
