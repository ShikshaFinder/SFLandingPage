import React from 'react'
import { useRouter } from 'next/router'

function index() {
  const router = useRouter()
  setTimeout(() => {
    router.push('/')
  },10000)
  return (
    <div>admssionform/name of classes required
      You might be in wrong url
    </div>
  )
}

export default index