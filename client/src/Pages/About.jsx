const About = () => {
    return (
        <div>
            <section className="about-container">
                <header>
                    <h1>HitPump World</h1>
                    <p>
                        Your go-to platform for cutting-edge technology and
                        innovative solutions.
                    </p>
                </header>

                <div className="content">
                    <section className="about-text">
                        <h2>Our Mission</h2>
                        <p>
                            At HitPump World, we strive to create a
                            transformative digital space where technology meets
                            creativity, empowering users with intuitive and
                            powerful tools.
                        </p>

                        <h2>Our Vision</h2>
                        <p>
                            To be at the forefront of innovation, building
                            products that make life easier and more connected
                            for people globally.
                        </p>
                    </section>

                    <section className="developers-section">
                        <h2>Meet Our Developers</h2>
                        <div className="developer-list">
                            <div className="developer-card">
                                <img src="/images/seo.png" alt="Developer 1" />
                                <h3>Niraj Prajapati</h3>
                                <p>Lead Developer</p>
                                <p>
                                    Expert in full-stack development with a
                                    passion for building scalable solutions.
                                </p>
                            </div>
                            <div className="developer-card">
                                <img src="images/ai.png" alt="Developer 2" />
                                <h3>Ayush Aryal</h3>
                                <p>UI/UX Designer</p>
                                <p>
                                    Creative designer with a knack for crafting
                                    user-friendly interfaces and seamless
                                    experiences.
                                </p>
                            </div>
                            <div className="developer-card">
                                <img src="images/info.png" alt="Developer 3" />
                                <h3>Manish Kumar</h3>
                                <p>Backend Developer</p>
                                <p>
                                    Backend specialist focusing on optimizing
                                    performance and building reliable APIs.
                                </p>
                            </div>
                        </div>
                    </section>
                </div>
            </section>
        </div>
    );
};

export default About;
