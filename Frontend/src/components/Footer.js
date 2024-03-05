import "./FooterStyles.css"

const Footer = () => {
    return (
        <div className="footer">
            <div className="top">

                <div>
                    <h1>Trip-Kar</h1>
                    <p  >Choose your favourite destination.</p>
                </div>

                <div>
                    
                    <a href="https://www.facebook.com/">
                        <i className="fa-brands fa-facebook-square"></i>
                    </a>
                    <a href="https://www.instagram.com/">
                        <i className="fa-brands fa-instagram-square"></i>
                    </a>
                    <a href="https://twitter.com/?lang=en">
                        <i className="fa-brands fa-twitter-square"></i>
                    </a>
                    <a href="https://accounts.google.com/v3/signin/identifier?continue=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&emr=1&followup=https%3A%2F%2Fmail.google.com%2Fmail%2Fu%2F0%2F&ifkv=ATuJsjzU0Ow9e2bhILhcVDs87qkElv-_G-_ysDvqEN-H_O1AO6fcIECosfKFtJSNjYSJzgJ1IPkxyQ&osid=1&passive=1209600&service=mail&flowName=GlifWebSignIn&flowEntry=ServiceLogin&dsh=S-469469708%3A1708459624746575&theme=glif">
                    <i class="fa-solid fa-envelope"></i>
                    </a>
                    
                </div>

            </div>
            <div className="bottom ">
                <div>
                    <h4>Team Members</h4>
                    <a href="/linkedin.com/in/aniket-thakur-6664491b1">Aniket Thakur</a>
                    <a href="/linkedin.com/in/aman-shivhare-403805190">Aman Shivhare</a>
                    <a href="/linkedin.com/in/jay-kandare-7a7537264">Jay Kandare</a>
                    <a href="/linkedin.com/in/saurabh-vashisth-74655a229">Saurabh</a>
                    <a href="/linkedin.com/in/sachin-chaudhary-25b747226">Sachin Chaudhary</a>
                </div>

                <div>
                    <h4>Community</h4>
                    <a href="/">GitHub</a>
                    <a href="/">Issues</a>
                    <a href="/">Project</a>
                    <a href="/">All Twitter</a>
                </div>

                <div>
                    <h4>Help</h4>
                    <a href="/">Support</a>
                    <a href="/">Troubleshooting</a>
                    <a href="/">Contact</a>

                </div>

                <div>
                    <h4>Other</h4>
                    <a href="/">Terms of Service</a>
                    <a href="/">Privacy Policy</a>
                    <a href="/">License</a>
                </div>
            </div>
        </div>
    )
}

export default Footer