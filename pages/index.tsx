import React from 'react';
import Head from 'next/head';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Section from '@/components/Section';
import styles from '@/styles/Home.module.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>BlackRoad OS - Next Generation Operating System</title>
        <meta name="description" content="BlackRoad OS - A powerful, modern operating system with Lucidia, Quantum, and Prism technologies" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <h1 className={styles.heroTitle}>Welcome to BlackRoad OS</h1>
            <p className={styles.heroSubtitle}>
              The next generation operating system designed for power, flexibility, and innovation
            </p>
            <div className={styles.heroButtons}>
              <a href="#blackroad" className={styles.primaryButton}>Learn More</a>
              <a href="#" className={styles.secondaryButton}>Download</a>
            </div>
          </div>
        </section>

        {/* BlackRoad OS Section */}
        <Section 
          id="blackroad"
          title="BlackRoad OS"
          description="A powerful and modern operating system built from the ground up for performance, security, and user experience."
        >
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>⚡ Lightning Fast</h3>
              <p>Optimized for speed and efficiency with minimal resource usage</p>
            </div>
            <div className={styles.feature}>
              <h3>🔒 Secure by Design</h3>
              <p>Built with security as a core principle from day one</p>
            </div>
            <div className={styles.feature}>
              <h3>🎨 Beautiful UI</h3>
              <p>Modern, intuitive interface that adapts to your workflow</p>
            </div>
          </div>
        </Section>

        {/* Lucidia Section */}
        <Section 
          id="lucidia"
          title="Lucidia"
          description="The intelligent assistant that understands your needs and helps you work smarter, not harder."
        >
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🤖 AI-Powered</h3>
              <p>Leverages advanced AI to provide intelligent suggestions and automation</p>
            </div>
            <div className={styles.feature}>
              <h3>🎯 Context-Aware</h3>
              <p>Understands your workflow and adapts to your specific needs</p>
            </div>
            <div className={styles.feature}>
              <h3>🔄 Seamless Integration</h3>
              <p>Works across all your applications and tools effortlessly</p>
            </div>
          </div>
        </Section>

        {/* Quantum Section */}
        <Section 
          id="quantum"
          title="Quantum"
          description="Revolutionary performance engine that pushes the boundaries of what's possible on modern hardware."
        >
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>⚙️ Advanced Processing</h3>
              <p>Utilizes cutting-edge algorithms for maximum efficiency</p>
            </div>
            <div className={styles.feature}>
              <h3>📊 Real-time Analytics</h3>
              <p>Monitor and optimize system performance on the fly</p>
            </div>
            <div className={styles.feature}>
              <h3>🚀 Scalable Architecture</h3>
              <p>Grows with your needs from single core to massive clusters</p>
            </div>
          </div>
        </Section>

        {/* Prism Section */}
        <Section 
          id="prism"
          title="Prism"
          description="A comprehensive development framework that empowers developers to create amazing applications."
        >
          <div className={styles.features}>
            <div className={styles.feature}>
              <h3>🛠️ Developer-Friendly</h3>
              <p>Intuitive APIs and extensive documentation for rapid development</p>
            </div>
            <div className={styles.feature}>
              <h3>🌐 Cross-Platform</h3>
              <p>Build once, deploy everywhere with native performance</p>
            </div>
            <div className={styles.feature}>
              <h3>📦 Rich Ecosystem</h3>
              <p>Access thousands of libraries and tools from the community</p>
            </div>
          </div>
        </Section>
      </main>

      <Footer />
    </>
  );
}
