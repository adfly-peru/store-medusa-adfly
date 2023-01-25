import { Flex, LoadingOverlay } from '@mantine/core';
import Head from 'next/head'
import Image from 'next/image'
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react'
import styles from '../styles/Home.module.css'

export default function Home() {
  const router = useRouter()
  useEffect(() => {
    router.push("/home")
  });
  return (
    <Flex
      justify="center"
      align="center"
      wrap="wrap"
    >
      <LoadingOverlay visible={true} overlayBlur={2} overlayOpacity={0.9}/>
    </Flex>
  )
}
