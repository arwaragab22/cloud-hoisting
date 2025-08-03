import React from 'react'
import AddArticleForm from './Addarticle'
import  Jwt  from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from "next/navigation";

async function page() {

  return (
  <AddArticleForm/>
  )
}

export default page