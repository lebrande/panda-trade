import { LoaderIcon, XIcon } from "lucide-react";

export const PathViz = ({
  isFetching,
  isError,
  pathVizImage,
}: {
  isFetching: boolean;
  isError: boolean;
  pathVizImage: string | undefined;
}) => {
  if (isError) {
    return (
      <>
        <XIcon className="w-4 h-4 text-destructive" />
        <div className="flex flex-col items-center">
          <span>Couldn't load the data for this visual</span>
        </div>
      </>
    );
  }

  if (isFetching) {
    return (
      <>
        <LoaderIcon className="w-4 h-4 animate-spin" />
        <div className="flex flex-col items-center">
          <span>Loading visual...</span>
        </div>
      </>
    );
  }

  if (pathVizImage) {
    return <img src={pathVizImage} alt="Swap path visualization" />;
  }

  return (
    <p className="text-sm text-muted-foreground">
      The swap path will be displayed here
    </p>
  );
};
