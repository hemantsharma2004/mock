import { NextResponse } from 'next/server';
import { db } from '../../../utils/db';
import {UserAnswer } from '../../../utils/schema'
import moment from 'moment';

export async function POST(req) {
  try {
    const {
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback, 
      rating,
      userEmail,
    } = await req.json();

    const inserted = await db.insert(UserAnswer).values({
      mockIdRef,
      question,
      correctAns,
      userAns,
      feedback,
      rating,
      userEmail,
      createdAt: moment().format('DD-MM-YYYY'),
    });

    return NextResponse.json({ success: true, inserted });
  } catch (error) {
    console.error('Insert error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
