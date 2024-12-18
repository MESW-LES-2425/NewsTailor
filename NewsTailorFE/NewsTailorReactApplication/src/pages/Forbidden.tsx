export default function Forbidden() {
    return (
            <div className={"container"}>
                <h1 className={"header"}>403 Forbidden</h1>
                <h2> YOU SHALL NOT PASS! </h2>
                <img src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGFhdWFoZ3l0dmFvb3lhbXBtMzJpeDE3em91cWJtbGI5N2xleDEydCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/njYrp176NQsHS/giphy.gif"
                                               alt="Gandalf saying you shall not pass"/>
                <button className={"auth-button"} onClick={() => window.location.href = "/"}>home</button>
            </div>
    );
}