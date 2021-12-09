import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Pagination,
  Paper,
} from "@mui/material";
import { useNavigate } from "raviger";
import React, { useEffect, useState } from "react";
import { DataList, fetchList } from "../shared/repository";

export const Home = () => {
  const navigate = useNavigate();
  const [data, setData] = useState<DataList | null>(null);
  const [page, setPage] = useState(1);

  const changePage = (i: number) => {
    setPage(i);
    fetchList(i).then((d) => setData(d));
  };

  useEffect(() => {
    fetchList().then((d) => setData(d));
  }, []);

  return (
    <>
      {data ? (
        <>
          <List
            sx={{
              paddingBottom: "48px",
              listStylePosition: "inside",
              columns: { xs: 1, sm: 2, lg: 4 },
            }}
          >
            {data.results.map((item) => (
              <ListItem
                key={item.id}
                onClick={() => navigate(`character/${item.id}`)}
              >
                <ListItemAvatar>
                  <Avatar alt={`avatar`} src={item.image} />
                </ListItemAvatar>
                <ListItemText
                  sx={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  primary={item.name}
                ></ListItemText>
              </ListItem>
            ))}
          </List>
          <Paper
            elevation={3}
            sx={{
              position: "fixed",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "8px",
            }}
          >
            <Pagination
              sx={{ display: "flex", justifyContent: "center" }}
              count={data.info.pages}
              page={page}
              onChange={(e, page) => changePage(page)}
            />
          </Paper>
        </>
      ) : (
        <>loading</>
      )}
    </>
  );
};
