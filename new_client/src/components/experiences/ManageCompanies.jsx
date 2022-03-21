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

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  button: {
    marginTop: "10px",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  link: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "15px 5px",
  },
  divider: {
    height: "1px",
    width: "80%",
    margin: "10px auto",
  },
}));

const ManageCompanies = (props) => {
  const classes = useStyles();

  const [companyList, setCompanyList] = useState([]);
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
      .get(process.env.REACT_APP_API + "/companies")
      .then((res) => {
        console.log(res.data);
        setCompanyList(res.data.companies);
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
                Manage Companies
              </Typography>
            </Grid>
            
				{
					companyList.map((company, index) => {
						return <Grid item xs={12} md={2}>
							
						 <Card className={classes.root}>
							
							<div
								style={{
									display: "flex",
									alignItem: "center",
									justifyContent: "center",
									height: "100%"
								}}
							>
								<CardMedia
									style={{
										width: "100%",
										objectFit: "contain"
									}}
									component="img"
									image={company.image.url}
									title="Contemplative Reptile"
								/>
							</div>
							<Divider className={classes.divider} />
							<CardContent
								style={{ flex: "1" }}
								className={classes.cardContent}
							>
								<Typography
									style={{ color: "#224903" }}
									align="center"
									variant="h6"
								>
									{company.title}
								</Typography>
							</CardContent>
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
            <AddCompany
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
      <Divider className={classes.divider} />
      <Container maxWidth="lg" className={classes.link}>
        <Button
            style={{ color: "#224903" }}
            align="center"
            variant="contained"
            onClick={() => {setShowModal(true);}}
          >
            Add Company
        </Button>
      </Container>
    </>
  );
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated,
	userID: state.auth.userID,
	token: state.auth.token,
});
  
export default connect(mapStateToProps)(ManageCompanies);
