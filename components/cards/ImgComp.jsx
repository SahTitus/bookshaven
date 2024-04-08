import Image from 'next/image'
import React from 'react'

const ImgComp = ({name, size, classId, }) => {
  return (
    <Image
    src={`/images/${name}`}
    width={size}
    height={size}
    alt=''
    className={classId}
  />
  )
}

export default ImgComp