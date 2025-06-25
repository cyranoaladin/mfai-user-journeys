import type { JourneyData } from '@/types/journey';
import logger from '@/utils/logger';

export async function getJourneyData(slug: string): Promise<JourneyData> {
  try {
    const response = await fetch(`/api/journeys/${slug}`);
    if (!response.ok) {
      throw new Error('Failed to fetch journey data');
    }
    return await response.json();
  } catch (error) {
    logger.error('Error fetching journey data:', error);
    throw error;
  }
}
