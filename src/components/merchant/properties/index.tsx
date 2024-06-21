"use client";

import { addProperty, fetchProperties } from "@/components/backend/merchapi";
import { UserError } from "@/components/manage/errors";
import { Loading } from "@/components/manage/loading";
import Button from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import AddProperty from "./add-property";
import { EmptyProperty } from "@/components/manage/empty-property";
import { TProperty } from "@/components/types";
import { NoImage } from "@/components/manage/no-image";
import PropertyDetail from "./property";
import { motion } from "framer-motion";
import Carousel from "@/components/ui/carousel";
import PropertyPhotos from "./property-photos";
import MapWithData from "@/components/map/mapwithdata";
import { useState } from "react";

const Properties = () => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [showMap, setShowMap] = useState(false);

  const setParams = (name: string) => {
    const params = new URLSearchParams(searchParams);
    params.set("modal", name);
    router.replace(`${pathname}?${params.toString()}`);
  };
  const clearParams = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("modal");
    router.replace(`${pathname}?${params.toString()}`);
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["fetchProperties"],
    queryFn: () => fetchProperties(),
    retry: 2,
    staleTime: 60 * 1000,
  });

  const addProperties = useMutation({
    mutationFn: addProperty,
    onSuccess: (data) => {
      router.replace(`/merchant/property/${data.id}?modal=photos`);
      queryClient.invalidateQueries({
        queryKey: ["fetchProperties"],
      });
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <UserError />;
  return (
    <>
      <div className="flex justify-end me-3 mb-3">
        <Button
          variant="btn-link"
          onClick={() => {
            setParams("add_property");
          }}
        >
          Add Property
        </Button>
      </div>

      {data.length < 1 && <EmptyProperty />}
      {data.length >= 1 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
            {data.map((field: TProperty, index: number) => (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.3,
                  delay: index / 2,
                }}
                key={field.id}
                className=""
              >
                {field.photos.length < 1 ? (
                  <NoImage />
                ) : field.photos.length > 1 ? (
                  <Carousel photo={field.photos} />
                ) : (
                  <div className="min-h-48 h-48 max-h-48 w-10/12 mx-auto mb-3 ">
                    <PropertyPhotos field={field.photos[0]} />
                  </div>
                )}
                <PropertyDetail
                  link={`/merchant/property/${field.id}`}
                  field={field}
                />
              </motion.div>
            ))}
          </div>
          <div className="fixed bottom-8 w-full max-w-[95.5rem] mx-auto flex items-center justify-center ">
            <Button
              className="w-40"
              onClick={() => {
                setShowMap(!showMap);
              }}
            >
              show map
            </Button>
          </div>

          <Modal isOpen={showMap}>
            <div className="fixed bottom-8 w-full max-w-[95.5rem] mx-auto z-50 flex items-center justify-center ">
              <Button
                autoFocus
                className="w-40"
                onClick={() => {
                  setShowMap(!showMap);
                }}
              >
                Close map
              </Button>
            </div>
            <div className="w-11/12 h-screen mx-auto py-2">
              <MapWithData data={data} />
            </div>
          </Modal>
        </>
      )}

      <Modal isOpen={searchParams.get("modal") === "add_property"}>
        <AddProperty close={clearParams} mutationQuery={addProperties} />
      </Modal>
    </>
  );
};

export default Properties;
