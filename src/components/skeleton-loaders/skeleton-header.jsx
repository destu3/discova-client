import './skeleton.component.css';

const SkeletonHeader = () => {
  return (
    <li className="flex overflow-hidden bg-[var(--overlay-grey)] flex-col items-center skeleton w-full h-[200px] md:h-[250px] lg:h-[300px] splide__slide">
      {/* Skeleton header */}
    </li>
  );
};

export default SkeletonHeader;
