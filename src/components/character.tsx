import { ArrowBack } from "@mui/icons-material";
import {
    Card,
    CardActionArea,
    CardContent,
    CardMedia,
    Chip,
    Fab,
    Typography
} from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "raviger";
import React, { useEffect, useState } from "react";
import { DataItem, fetchCharacter } from "../shared/repository";

interface Params {
  id: number;
}
export const Character = ({ id }: Params) => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataItem | null>(null);
  
  useEffect(() => {
    fetchCharacter(id).then((d) => setData(d));
  }, [id]);

  return (
    <>
      {data && (
        <Card
          sx={{
            maxWidth: { sm: 345, md: 700 },
            marginTop: "16px",
          }}
        >
          <CardActionArea>
            <CardMedia
              component="img"
              height="300"
              image={data.image}
              alt="avatar"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {data.name} <Chip label={data.status} />
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", md: "row" },
                  justifyContent: "space-between",
                }}
              >
                <Box>
                  <Box>
                    Species: <b>{data.species}</b>
                  </Box>
                  <Box>
                    Gender: <b>{data.gender}</b>
                  </Box>
                </Box>
                <Box>
                  <Box>
                    Origin: <b>{data.origin.name}</b>
                  </Box>
                  <Box>
                    Last Known Location: <b>{data.location.name}</b>
                  </Box>
                </Box>
                <Box>
                  Number of episodes appearances:<b>{data.episode.length}</b>
                </Box>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      )}

      <Fab
        variant="extended"
        color="primary"
        aria-label="back"
        style={{
          position: "absolute",
          bottom: 16,
          right: 16,
        }}
        onClick={() => navigate("/")}
      >
        <ArrowBack />
        Back
      </Fab>
    </>
  );
};
