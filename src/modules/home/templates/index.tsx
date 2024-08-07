import Loader from "@modules/components/LoadingScreen/Loader";
import { Box, Modal, Stack } from "@mui/material";
import {
  HomeList,
  SecondaryBannersList,
  useBannersListsQuery,
  useBannersQuery,
  useHomeListsQuery,
} from "generated/graphql";
import { useEffect, useMemo, useState } from "react";
import BannerListCard from "../components/BannersListCard";
import HomeListCard from "../components/HomeListCard";
import MainBanners from "../components/MainBanners";
import SectionsView from "../components/SectionsView";
import { useDesign } from "@context/design-context";
import { useRouter } from "next/router";
import RecoveryModal from "@modules/authentication/components/login/RecoveryPassword";

export enum ListType {
  BANNER = "BANNER",
  HOME = "HOME",
}

const Home = () => {
  const router = useRouter();
  const { recoverytoken } = router.query;
  const { data: homeListData, loading: loading1 } = useHomeListsQuery();
  const { data: bannersListData, loading: loading2 } = useBannersListsQuery();
  const { storeDesign } = useDesign();
  const { data: mainBannersData, loading } = useBannersQuery();

  const bannersList = useMemo(() => {
    if (!storeDesign) return [];
    if (!mainBannersData) return [];
    return [
      { img: storeDesign.bannerurl, link: storeDesign.href },
      ...mainBannersData.banners.map((b) => ({
        img: b.bannerimageurl ?? "",
        link: b.bannerlink ?? "",
      })),
    ];
  }, [mainBannersData, storeDesign]);

  const items = useMemo(() => {
    const bannersList =
      bannersListData?.activeBannersLists.map((b) => ({
        type: ListType.BANNER,
        data: b,
        uuid: b.uuidbannerlist,
      })) ?? [];
    const homeList =
      homeListData?.activeHomeLists.map((b) => ({
        type: ListType.HOME,
        data: b,
        uuid: b.uuidhomelist,
      })) ?? [];
    const response = [...bannersList, ...homeList];
    response.sort((a, b) => a.data.pos - b.data.pos);
    return response;
  }, [bannersListData?.activeBannersLists, homeListData?.activeHomeLists]);

  if (
    !homeListData ||
    !mainBannersData ||
    !bannersListData ||
    loading1 ||
    loading2 ||
    loading ||
    !storeDesign
  ) {
    return <Loader />;
  }

  return (
    <Stack
      sx={(theme) => ({
        backgroundColor: "#F2F2F2",
        gap: "30px",
        paddingBottom: "30px",
        [theme.breakpoints.down(949)]: {
          gap: "20px",
          paddingBottom: "20px",
        },
      })}
    >
      <Modal open={!!recoverytoken}>
        <Box
          sx={{
            position: "absolute",
            inset: "0px",
            height: "100%",
            overflow: "hidden auto",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            padding: "1.5rem",
          }}
        >
          <Box
            sx={(theme) => ({
              position: "relative",
              margin: "auto",
              height: "max-content",
              maxHeight: "unset",
              transform: "none",
              top: "unset",
              left: "unset",
            })}
          >
            <RecoveryModal
              token={recoverytoken ? (recoverytoken as string) : ""}
            />
          </Box>
        </Box>
      </Modal>
      <MainBanners bannersList={bannersList} />
      <SectionsView />
      {items.map((item) => (
        <Box key={item.uuid}>
          {item.type === ListType.BANNER ? (
            <BannerListCard
              key={item.uuid}
              bannerList={item.data as SecondaryBannersList}
            />
          ) : (
            <HomeListCard key={item.uuid} homeList={item.data as HomeList} />
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default Home;
