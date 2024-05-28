import { Box, Stack } from "@mui/material";
import { SecondaryBannersList } from "generated/graphql";
import Image from "next/image";

const defaultImage = "https://via.placeholder.com/400";

const BannerListCard = ({
  bannerList,
}: {
  bannerList: Partial<SecondaryBannersList>;
}) => {
  return (
    <Box
      sx={(theme) => ({
        padding: "60px 110px",
        backgroundColor: "#F2F2F2",
        width: "100%",
        [theme.breakpoints.down("lg")]: {
          padding: "30px 30px",
        },
        [theme.breakpoints.down("md")]: {
          padding: "10px 10px",
        },
      })}
    >
      <Stack
        direction="row"
        spacing={8.75}
        sx={{ justifyContent: "space-between" }}
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
  );
};

export default BannerListCard;
