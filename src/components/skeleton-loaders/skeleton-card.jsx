const SkeletonCard = ({ className, featured }) => {
  // Set default class name if not provided
  const cardClassName = className
    ? className
    : `flex justify-center ${
        featured ? 'w-[140px] md:w-[180px]' : 'w-full'
      } aspect-[37/53] items-center rounded-[4px] bg-[var(--overlay-grey)] skeleton-poster relative overflow-hidden`;

  return <div className={cardClassName}></div>;
};

export default SkeletonCard;
