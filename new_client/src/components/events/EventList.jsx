import React, { useEffect, useState, useRef } from "react";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { connect } from "react-redux";
import axios from "axios";
import AlertUtility from "../Utilities/Alert";
import Spinner from "../spinner/Spinner";
import Modal from "../Modal/Modal";
import AddEvent from "./AddEvent";
import PropTypes from "prop-types";
import { Container, Grid, Tabs, Tab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import IndividualEvent from "./IndividualEvent";
import Banner from "./Banner";
import { isFuture } from "date-fns";
import { TitleWithDivider } from "./EventPage";
import useAuthenticatedAxios from "../Utilities/useAuthenticatedAxios.js";
import { format } from "date-fns";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  gridContainer: {
    paddingLeft: "40px",
    paddingRight: "40px",
  },
  tabBackground: {
    backgroundColor: "#EDEDED",
    marginTop: "1rem",
    borderRadius: "10px",
    padding: "0 10px"
  },
  tab: {
    "&:hover": {
      color: "#3B377C",
      opacity: 1,
    },
    "&:selected": {
      fontWeight: theme.typography.fontWeightMedium,
      color: "#21974D",
    },
    "&:focus": {
      color: "#21974D",
    },
  },
  tabLabel: {
    fontSize: theme.typography.h5.fontSize,
  },
}));


function EventList(props) {
  const authenticatedAxios = useAuthenticatedAxios();
  const [isMember, setIsMember] = useState(false);
  const [events, setEvents] = useState([]);
  const [years, setYears] = useState([]);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isRegisterSuccess, setIsRegisterSuccess] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isRegistered, setIsRegistered] = useState({});
  const [tabValue, setTabValue] = useState(0);
  const deletedEventID = useRef("");

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/events")
      .then((res) => {
        let isRegistered = {};
        res.data.forEach((article) => {
          isRegistered[article._id] =
            article.registeredUsers &&
            article.registeredUsers.includes(props.userID);
        });
        setIsRegistered(isRegistered);
        let yearsSet = new Set();
        setEvents(res.data.sort((a, b) => new Date(b.date) - new Date(a.date)));
        res.data.forEach((event) => yearsSet.add(parseInt(format(new Date(event.date), "yyyy"))));
        setYears(Array.from(yearsSet).sort((a, b) => b - a));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [counter, props.userID]);

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

  const handleModalClose = () => {
    setIsModalClosing(true);
    setCounter(counter + 1);
  };

  const handleDelete = (eventId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure you want to delete the event?",
      buttons: [
        {
          label: "Delete",
          onClick: async () => {
            const url = process.env.REACT_APP_API + `/events/${eventId}`;
            authenticatedAxios
              .delete(url)
              .then((res) => {
                if (res.status === 204) {
                  deletedEventID.current = eventId;
                  setIsDeleted(true);
                } else {
                  setIsError(true);
                }
              })
              .catch((err) => {
                setIsError(true);
                console.log(err);
              });
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
    setEvents((prevEvents) =>
      prevEvents.filter((event) => event._id !== deletedEventID.current)
    );
    setCounter(counter + 1);
  };

  const handleRSVP = async (eventId, isUserRegistered) => {
    try {
      const url = !isUserRegistered
        ? process.env.REACT_APP_API +
          `/events/register?eid=${eventId}&uid=${props.userID}`
        : process.env.REACT_APP_API +
          `/events/unregister?eid=${eventId}&uid=${props.userID}`;
      const response = await authenticatedAxios.post(url);
      if (response.status === 200) {
        const isRegisteredTemp = {
          ...isRegistered,
          eventId: !isRegistered[eventId],
        };
        setIsRegistered(isRegisteredTemp);
        setIsRegisterSuccess(true);
      } else {
        setIsError(true);
      }
    } catch (error) {
      console.error(error);
      setIsError(true);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const classes = useStyles();
  return (
    <article>
      {isLoading ? (
        <Spinner />
      ) : (
        <React.Fragment>
          <Banner isMember={isMember} setShowModal={setShowModal} />
          <Container>
            {
              // No Upcoming events
              events.filter((article) => isFuture(new Date(article.date)))
                .length > 0 && (
                <>
                  <Grid style={{ padding: "20px 0" }}>
                    <TitleWithDivider text="Upcoming Events" />
                  </Grid>
                  <Grid style={{ paddingTop: "10px" }} container spacing={4}>
                    {events
                      .filter(
                        (article) =>
                          isFuture(new Date(article.date)) && article.image
                      )
                      .map((article) => {
                        //displaying only events with images
                        return (
                          <IndividualEvent
                            key={article._id}
                            article={article}
                            isMember={isMember}
                            handleDelete={handleDelete}
                            isUserRegistered={isRegistered[article._id]}
                            handleRSVP={handleRSVP}
                            userID={props.userID}
                          />
                        );
                      })}
                  </Grid>
                </>
              )
            }
            {
              events.filter((article) => !isFuture(new Date(article.date)))
                .length > 0 && (
                <>
                  <Grid
                    className={classes.gridContainer}
                    style={{ padding: "30px 0 20px 0" }}
                  >
                    <TitleWithDivider text="Past Events" />
                    <Grid item className={classes.tabBackground}>
                      <Tabs
                        variant="scrollable"
                        value={tabValue}
                        aria-label="Year of Graduation"
                        className={classes.tabs}
                        onChange={handleTabChange}
                        TabIndicatorProps={{
                          style: {
                            backgroundColor: "#31D16D",
                            height: "4px",
                            borderRadius: "6px 6px 0 0"
                          }
                        }}
                      >
                        {
                          years.map((year, index) => {
                            return <Tab
                              key={index}
                              className={classes.tab}
                              label={<span className={classes.tabLabel}>{year}</span>}
                            />
                          })
                        }
                      </Tabs>
                    </Grid>
                  </Grid>
                  
                  <Grid item>
                    {years.map((year, index) => (
                      <TabPanel key={year} value={tabValue} index={index}>
                        <Grid
                          style={{ paddingTop: "10px", paddingBottom: "30px" }}
                          container
                          spacing={4}
                        >
                          {events
                            .filter(
                              (event) =>
                                !isFuture(new Date(event.date)) && event.image
                            ).filter(
                              (event) => parseInt(format(new Date(event.date), "yyyy")) == years[tabValue]
                            )
                            .map((event) => {
                              return (
                                <IndividualEvent
                                  key={event._id}
                                  article={event}
                                  isMember={isMember}
                                  handleDelete={handleDelete}
                                  handleRSVP={handleRSVP}
                                  userID={props.userID}
                                />
                              );
                            })}
                        </Grid>
                      </TabPanel>
                    ))}
                  </Grid>
                </>
              )
            }
          </Container>
        </React.Fragment>
      )}
      <Modal
        size="xl"
        show={showModal}
        header="Add New Event"
        hasCloseBtn
        closeHandler={handleModalClose}
      >
        <AddEvent
          closeModal={() => {
            setShowModal(false);
            setCounter(counter + 1);
          }}
        />
      </Modal>
      <Modal
        size="sm"
        keyboard={false}
        show={isModalClosing}
        header="Close form"
        backdrop="static"
        closeHandler={() => {
          setShowModal(false);
          setIsModalClosing(false);
          setCounter(counter + 1);
        }}
        hasBtn
        btnText="Cancel"
        btnClickHandler={() => setIsModalClosing(false)}
      >
        <p>All form data will be lost</p>
      </Modal>
      <AlertUtility
        open={isDeleted}
        duration={1000}
        onCloseHandler={handleClose}
        severity="success"
        message="Deleted Successfully! Reloading Events..."
      />
      <AlertUtility
        open={isError}
        duration={4500}
        onCloseHandler={() => setIsError(false)}
        severity="error"
        message="Oops! An error occurred. Please try again."
      />
      <AlertUtility
        open={isRegisterSuccess}
        duration={1000}
        onCloseHandler={() => {
          setIsRegisterSuccess(false);
          setCounter(counter + 1);
        }}
        severity="success"
        message="Event RSVP Updated"
      />
    </article>
  );
}

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  userID: state.auth.userID,
  token: state.auth.token,
});

export default connect(mapStateToProps)(EventList);
