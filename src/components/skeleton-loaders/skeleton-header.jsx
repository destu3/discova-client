import './skeleton.component.css';

const SkeletonHeader = () => {
  return (
    <li className="flex overflow-hidden bg-[var(--overlay-grey)] flex-col items-center skeleton w-full h-full splide__slide">
      {/* Skeleton header */}
    </li>
  );
};

export default SkeletonHeader;
