import { Button } from '@/components/atoms/Button';
import { StorybookButton } from '@/components/organisms/StorybookButton';
import { Web3Mock } from '@/components/organisms/Web3Mock';
import { MainLayout } from '@/components/templates/MainLayout';
import { motion } from 'framer-motion';
import Link from 'next/link';

/**
 * Home Page
 *
 * Landing page with hero section and journey entry point
 */

export default function Home() {
  return (
    <MainLayout>
      <section className="flex flex-col items-center justify-center min-h-[60vh] gap-8">
        <motion.h1
          className="text-4xl md:text-6xl font-extrabold text-center bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Welcome to Money Factory AI User Journeys
        </motion.h1>
        <motion.p
          className="text-lg md:text-2xl text-muted-foreground text-center max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Explore, learn, and earn rewards as you progress through immersive, gamified Web3 journeys tailored to your persona.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Link href="/journeys">
            <Button size="lg">Start Your Journey</Button>
          </Link>
        </motion.div>
      </section>
      <Web3Mock className="mt-8" />
      <StorybookButton />
    </MainLayout>
  );
}
