import { Box, Stack } from "@mui/material";
import { SecondaryBannersList } from "generated/graphql";
import Image from "next/image";

export const defaultImage = "https://via.placeholder.com/400";

const BannerListCard = ({
  bannerList,
}: {
  bannerList: Partial<SecondaryBannersList>;
}) => {
  return (
    <Stack direction="row" justifyContent="center">
      <Box
        sx={(theme) => ({
          backgroundColor: "#F2F2F2",
          width: "100%",
          maxWidth: 1440,
          [theme.breakpoints.down(1261)]: {
            maxWidth: 1220,
          },
          [theme.breakpoints.down(1121)]: {
            maxWidth: 980,
          },
          [theme.breakpoints.down(949)]: {
            maxWidth: 834,
          },
        })}
      >
        <Stack
          direction="row"
          sx={{
            justifyContent: "space-between",
            gap: { xs: "10px", msm: "60px" },
          }}
        >
          {bannerList.banners?.map((b, index) => (
            <Box
              key={b.linkurl}
              sx={{
                flex: "1 1 0",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Image
                src={
                  b.imgurl === defaultImage && bannerList.banners?.length === 1
                    ? "/default/SimpleBanner.svg"
                    : b.imgurl === defaultImage
                    ? `/default/DoubleBanner${index + 1}.svg`
                    : b.imgurl
                }
                sizes="100vw"
                width={10}
                height={50}
                style={{
                  width: "100%",
                  height: "auto",
                  objectFit: "contain",
                }}
                alt={b.linkurl}
              />
            </Box>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

export default BannerListCard;
