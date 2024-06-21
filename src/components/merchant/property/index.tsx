"use client";

import {
  PatchProperty,
  deleteProperties,
  fetchProperties,
} from "@/components/backend/merchapi";
import { TId } from "@/components/types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import PropertyDetail from "../properties/property";
import { Loading } from "@/components/manage/loading";
import { UserError } from "@/components/manage/errors";
import { NoImage } from "@/components/manage/no-image";
import Carousel from "@/components/ui/carousel";
import Button from "@/components/ui/button";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import Modal from "@/components/ui/modal";
import Photos from "./photos";
import AddProperty from "../properties/add-property";

const Property = ({ id }: TId) => {
  const queryClient = useQueryClient();

  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

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
    queryKey: [`fetchProperty${id}`],
    queryFn: () => fetchProperties(id),
    retry: 2,
    staleTime: 60 * 1000,
  });

    const updateProperty = useMutation({
      mutationFn: PatchProperty,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [`fetchProperty${id}`],
        });
        queryClient.invalidateQueries({
          queryKey: ["fetchProperties"],
        });
        clearParams();
      },
    });

  const deleteProperty = useMutation({
    mutationFn: deleteProperties,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchProperties"],
      });
      router.replace("/merchant/properties");
    },
  });

  if (isLoading) return <Loading />;
  if (error) return <UserError />;
  return (
    <>
      <div className="flex justify-end me-3 mb-3">
        <Button
          className="text-red-500"
          variant="btn-link"
          onClick={() => {
            deleteProperty.mutate({ id, property: true });
          }}
        >
          Delete property
        </Button>
        <Button
          variant="btn-link"
          onClick={() => {
            setParams("update");
          }}
        >
          Update details
        </Button>
        <Button
          variant="btn-link"
          onClick={() => {
            setParams("photos");
          }}
        >
          All photos
        </Button>
      </div>

      {data.photos.length < 1 ? (
        <NoImage />
      ) : (
        <Carousel
          photo={data.photos}
          className="min-w-64 min-h-64  max-h-64 md:min-w-80 md:min-h-80  md:max-h-80"
          play
        />
      )}
      <PropertyDetail field={data} />
      <Modal isOpen={searchParams.get("modal") === "update"}>
        <AddProperty
          id={id}
          close={clearParams}
          data={data}
          mutationQuery={updateProperty}
        />
      </Modal>
      <Modal isOpen={searchParams.get("modal") === "photos"}>
        <Photos close={clearParams} field={data.photos} id={id} />
      </Modal>
    </>
  );
};

export default Property;
