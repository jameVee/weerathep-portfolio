import type { IllustrationName } from './names';
import TwoTierValidation from './TwoTierValidation.astro';
import NetworkOutage from './NetworkOutage.astro';
import MachineFailure from './MachineFailure.astro';
import HallucinationSpan from './HallucinationSpan.astro';
import PointCloudPruning from './PointCloudPruning.astro';
import RatingMatrix from './RatingMatrix.astro';

/** Maps the `illustration:` name used in content files to its SVG component. */
export const illustrations: Record<IllustrationName, typeof TwoTierValidation> = {
  'two-tier-validation': TwoTierValidation,
  'network-outage': NetworkOutage,
  'machine-failure': MachineFailure,
  'hallucination-span': HallucinationSpan,
  'point-cloud-pruning': PointCloudPruning,
  'rating-matrix': RatingMatrix,
};
