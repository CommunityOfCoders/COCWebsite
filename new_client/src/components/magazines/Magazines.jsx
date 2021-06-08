import React, { useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import { Link, withRouter, useLocation } from "react-router-dom";
import axios from "axios";
import { Container, Grid, Typography, Box } from "@material-ui/core";
import ProjectGroup from "../projects/ProjectGroupCard";
import Spinner from "../spinner/Spinner";
import Banner from "./Banner";
import IndividualMagazineCard from "./IndividualMagazineCard";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import AlertUtility from "../Utilities/Alert";

const Magazines = (props) => {
  const [isMember, setIsMember] = useState(false);
  const [loading, setLoading] = useState(true);
  const [magazines, setMagazines] = useState(null);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const deletedMagazineID = useRef("");

  useEffect(() => {
    setLoading(false);
    axios
      .get(process.env.REACT_APP_API + "/magazines")
      .then((res) => {
        const domainList = res.data;
        setMagazines(domainList);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (props.userID) {
      axios
        .post(
          process.env.REACT_APP_API + "/user",
          JSON.stringify({ userID: props.userID }),
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setIsMember(res.data.isMember);
        })
        .catch((err) => console.log(err));
    }
  }, [props.userID]);

  const handleDelete = (magazineId) => {
    // alert(magazineId);
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the magazine?",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            const res = await axios.delete(
              process.env.REACT_APP_API + `/magazines/${magazineId}`,
              {
                headers: {
                  Authorization: "Bearer " + props.token,
                },
              }
            );
            if (res.status === 204) {
              deletedMagazineID.current = magazineId;
              setIsDeleted(true);
            } else {
              setIsError(true);
            }
          },
        },
        {
          label: "Cancel",
          onClick: () => {},
        },
      ],
    });
  };

  const handleClose = () => {
    setIsDeleted(false);
    setMagazines((prevMagazines) =>
      prevMagazines.filter((mag) => mag._id !== deletedMagazineID.current)
    );
  };

  return loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      <Banner />
      <Box p={1} m={2}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "#52b107" }}
                gutterBottom
              >
                Magazines
              </Typography>
            </Grid>
            {magazines &&
              magazines.map((magazine) => (
                <Grid item xs={12} md={4} key={magazine._id}>
                  <IndividualMagazineCard
                    id={magazine._id}
                    imageURL={magazine.photoURL}
                    title={magazine.magazineName}
                    description={magazine.description}
                    pdfUrl={magazine.downloadURL}
                    date={magazine.date}
                    isMember={isMember}
                    handleDelete={handleDelete}
                  />
                </Grid>
              ))}
          </Grid>
        </Container>
      </Box>
      <AlertUtility
        open={isDeleted}
        duration={1000}
        onCloseHandler={handleClose}
        severity="success"
        message="Deleted Successfully! Reloading Magazines..."
      />
    </React.Fragment>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token,
});

export default withRouter(connect(mapStateToProps)(Magazines));
