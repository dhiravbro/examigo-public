import React, { useState } from 'react';
import './Homepage.css';
import cloud from '../../assets/images/SVG/cloud2.svg';
import analysis from '../../assets/images/SVG/analysis.svg';
import background from '../../assets/images/SVG/background3.svg';
import test from '../../assets/images/SVG/test.svg';
import competition from '../../assets/images/SVG/competition.svg';
import discussion from '../../assets/images/SVG/discussion-forum.svg';
import tagsearch from '../../assets/images/SVG/tag-search.svg';
import wallet from '../../assets/images/SVG/wallet-friendly.svg';
import abhay from '../../assets/images/abhay.jpg';
import dhirav from '../../assets/images/dhirav.jpg';
import pratik from '../../assets/images/pratik.jpg';
import { Link } from 'react-router-dom';
import Login from '../Login';

function Homepage() {
	const [ modal, setModal ] = useState(false);
	const showModalHandler = () => setModal(!modal);

	return (
		<div>
			<section id="Title">
				<Login showmodal={modal} clicked={() => showModalHandler()} />
				<nav id="mainNavbar" className=" navbar navbar-light navbar-expand-lg fixed-top">
					<a href="index.html" id="examigo" className="navbar-brand text-light">
						examigo
					</a>
					<button
						className="navbar-toggler"
						type="button"
						data-toggle="collapse"
						data-target="#navbarSupportedContent"
						aria-controls="navbarSupportedContent"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon" />
					</button>
					<div className="collapse navbar-collapse navigation " id="navbarSupportedContent">
						<ul className="navbar-nav ml-auto ">
							<li className="nav-item">
								<a
									className="nav-link text-light"
									onClick={() => showModalHandler()}
									type="button"
									href="#"
									data-toggle="modal"
									data-target="#modalLRForm"
								>
									{' '}
									Sign In{' '}
								</a>
							</li>
							<li className="nav-item ">
								<Link to="/signup" className="nav-link text-light">
									Sign Up
								</Link>
							</li>
							<li className="nav-item ">
								<Link to="/adminsignup" className="nav-link text-light">
									Sign Up(admin)
								</Link>
							</li>
							<li className="nav-item dropdown">
								<a
									className="nav-link text-light dropdown-toggle"
									href="#"
									id="navbarDropdown"
									role="button"
									data-toggle="dropdown"
									aria-haspopup="true"
									aria-expanded="false"
								>
									About Us{' '}
								</a>
								<div className="dropdown-menu" aria-labelledby="navbarDropdown">
									<a className="dropdown-item" href="#Features">
										Why Join Us ?
									</a>

									<a className="dropdown-item" href="#AboutUs">
										Our Team
									</a>

									<a className="dropdown-item" href="#footer">
										Contact Us
									</a>
								</div>
							</li>
						</ul>
					</div>
				</nav>
			</section>

			<section>
				<div className="container-fluid pt-5 background">
					<div className="row">
						<div className="col-lg-3 d-none d-lg-inline title ml-0">
							<img className="cloud mt-5" src={cloud} alt="" />
						</div>
						<div className="col-lg-8 w-100 w-lg-25 computer mr-0 pr-0">
							<img src={background} alt="" />
						</div>
					</div>
				</div>
			</section>

			<section id="Features" className="">
				<div className="feature-section ">
					<div className="container bg-light p-5">
						<div className="container bg-light p-5 rounded shadow-lg feature-container">
							<br />
							<div>
								<h1 className="whytojoinus  text-left ml-5 text-primary display-4 font-weight-bolder mt-0">
									Why to join us?
								</h1>
							</div>
							<hr />
							<div className="row">
								<div className="col-lg-6 my-3  d-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={test} alt="tests" />
									<h3 className="description mt-5 text-left h5 px-3">
										Tests prepared by the best faculty nationwide
									</h3>
								</div>
								<div className="col-lg-6 my-3  d-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={competition} alt="compete" />
									<h3 className="description mt-5 text-left h5  px-3">
										Compete with students nation-wide and know where you stand right now.
									</h3>
								</div>

								<div className="col-lg-6 my-3  d-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={analysis} alt="performance-wise-analysis" />
									<h3 className="description mt-5 text-left h5 px-3">
										In-Depth Analysis of your performance both subject-wise and overall
									</h3>
								</div>
								<div className="col-lg-6 my-3  d-none d-lg-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={discussion} alt="discussion forum for doubts" />
									<h3 className="description mt-5 text-left h5 px-3">
										Discuss your doubts with your fellow competitors in the Global Discussion Forum.
									</h3>
								</div>

								<div className="col-lg-6 my-3  d-none d-lg-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={tagsearch} alt="question-search" />
									<h3 className="description mt-5 text-left h5 px-3">
										Focus on your weak areas by searching questions by their topic-wise tags
									</h3>
								</div>
								<div className="col-lg-6 my-3  d-none d-lg-flex justify-content-start align-items-center text-secondary">
									<img className=" mt-5 mr-4" src={wallet} alt="cost-effective" />
									<h3 className="description mt-5 text-left h5 px-3">
										Wallet friendly alternative to pretty expensive options out there.
									</h3>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="Packages" className="p-3">
				<div className="container-fluid package">
					<div className="row d-flex justify-content-around">
						<div className="col">
							<h1 className="text-white mt-5 mb-0 display-4 ">Packages</h1>
							<hr className="package-line mb-5" />
							<br />
						</div>
					</div>

					<div className="row d-flex justify-content-around align-items-center">
						<div className="col-lg-3 mb-5">
							<div className="card " style={{ width: '18rem' }}>
								<img className="card-img-top" src={abhay} alt="Card cap" />
								<div className="card-body">
									<h5 className="card-title">Bhakchod No 1</h5>
									<p className="card-text">
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</p>
									<a href="#" className="btn btn-primary">
										Need ass
									</a>
								</div>
							</div>
						</div>

						<div className="col-lg-3 mb-5">
							<div className="card " style={{ width: '18rem' }}>
								<img className="card-img-top " src={dhirav} alt="Card cap" />
								<div className="card-body">
									<h5 className="card-title">Lauda ka Legend</h5>
									<p className="card-text">
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</p>
									<a href="#" className="btn btn-primary">
										fuck off
									</a>
								</div>
							</div>
						</div>
						<div className="col-lg-3 ">
							<div className="card  mb-5" style={{ width: '18rem' }}>
								<img className="card-img-top" src={pratik} alt="Card cap" />
								<div className="card-body">
									<h5 className="card-title">Kawa(suggested by Abhay)</h5>
									<p className="card-text">
										Some quick example text to build on the card title and make up the bulk of the
										card's content.
									</p>
									<a href="#" className="btn btn-primary">
										Rs-200
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="AboutUs">
				<h3 className="text-center display-4 text-primary font-weight-bold">About Us</h3>
				<div className="container my-5 p-5 border rounded border-white carousel-container">
					{/* <div id="carouselExampleSlidesOnly" className="carousel slide" data-ride="carousel" interval=2000 pause="hover"> */}
					<div>
						<div className="carousel-inner">
							<div className="carousel-item active">
								<img className="d-block w-25" src={abhay} alt="First slide" />
							</div>
							<div className="carousel-item">
								<img className="d-block w-25" src={pratik} alt="Second slide" />
							</div>
							<div className="carousel-item">
								<img className="d-block w-25" src={dhirav} alt="Third slide" />
							</div>
						</div>
					</div>
				</div>
			</section>

			<section id="footer">
				<div className="container-fluid d-flex justify-content-center p-5">
					<a className="m-5 text-white footer-link" href="https://www.facebook.com">
						Facebook
					</a>
					<a className="m-5 text-white footer-link" href="linkedin.com">
						LinkedIn
					</a>
					<a className="m-5 text-white footer-link" href="Instagram.com">
						Instagram
					</a>
				</div>
			</section>
		</div>
	);
}
export default Homepage;
