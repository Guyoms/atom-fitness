import type { NextConfig } from "next";
import nextPWA from 'next-pwa'

const config: NextConfig = nextPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === 'development'
})({
  /* config options here */
});

export default config;
