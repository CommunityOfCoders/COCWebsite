import React, {useState, useEffect} from "react";
import Modal from "../Modal/Modal";
import { Container, Box, Grid, Typography } from "@material-ui/core";
import { Divider, IconButton } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import deshaw from "../assets/DEShaw.webp";
import AddCompany from "./AddCompany";
import axios from "axios";
import { connect } from "react-redux";
import PersonIcon from "@material-ui/icons/Person";
import EventNote from "@material-ui/icons/EventNote";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { green, red } from "@material-ui/core/colors";
import VerifyExperience from "./VerifyExperience";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "16px",
  },
  cardContentSecond: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    paddingTop: "0px",
  },
  divider: {
    margin: "50px auto",
    height: "1px",
    width: "90%",
    backgroundColor: "rgb(0 100 0 / 39%)",
  },
}));

const ManageExperiences = (props) => {
  const classes = useStyles();

  const [unverifiedList, setUnverifiedList] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isModalClosing, setIsModalClosing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleModalClose = () => {
    setIsModalClosing(true);
	setCounter(counter + 1);
  };

  useEffect(() => {
    axios
      .get(process.env.REACT_APP_API + "/unverifiedInterview")
      .then((res) => {
        console.log(res.data);
        setUnverifiedList(res.data.unverifiedList);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, [counter, props.userID]);

  return (
    <>
      <Box p={1} m={2}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12}>
              <Typography
                variant="h4"
                style={{ color: "#52b107" }}
                gutterBottom
              >
                Manage Experiences
              </Typography>
            </Grid>
            
				{
					(unverifiedList.length == 0) ? 
                    <Grid item xs={12}>
                        <Typography
                            style={{ color: "#224903", fontStyle: "italic" }}
                            align="center"
                            variant="h6"
                        >
                            Nothing here kiddo
                        </Typography>
                    </Grid>
                    : unverifiedList.map((exp, index) => {
						return <Grid key={index} item xs={12} md={4}>
                            <Card className={classes.root}>
                                <CardContent
                                    style={{ flex: "1" }}
                                    className={classes.cardContent}
                                >
                                <Typography
                                    style={{ color: "#224903" }}
                                    align="center"
                                    variant="h6"
                                >
                                    {exp.companyRequest}
                                </Typography>
                                {/* <Link to="/writeexp"> */}
                                
                                </CardContent>
                                <CardContent
                                // style={{ flex: "2" }}
                                className={classes.cardContentSecond}
                                >
                                <Typography align="center">
                                    <PersonIcon style={{ margin: "5px" }} />
                                    {""}
                                    {exp.createdBy}
                                </Typography>
                                <Typography align="center">
                                    <EventNote style={{ margin: "5px" }} />
                                    {exp.appliedYear}
                                </Typography>
                                </CardContent>
                                <CardActions
                                    disableSpacing="true"
                                    style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
                                    >
                                    <Button variant="outlined" startIcon={<CheckCircleIcon />}>
                                        Verify
                                    </Button>
                                    <Button
                                        style={{ color: "#224903" }}
                                        align="center"
                                        variant="contained"
                                        className={classes.button}
                                    >
                                        Read Experience
                                    </Button>    
                                </CardActions>
                            </Card>
						</Grid>
					})
				}
              
            
          </Grid>
        </Container>
        <Modal
            size="xl"
            show={showModal}
            header="Add New Company"
            hasCloseBtn
            closeHandler={handleModalClose}
        >
            <VerifyExperience
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
      </Box>
    </>
  );
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	userID: state.auth.userID,
	token: state.auth.token,
});
  
export default connect(mapStateToProps)(ManageExperiences);
