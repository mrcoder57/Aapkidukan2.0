import Cover from "../assets/pexels-cleyton-ewerton-3017260.jpg"


const Login = () => {
   
    const handleSubmit=(event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform form submission logic, for example, sending data to a server
    
        // After the form is submitted, redirect to a new page
      window.location.href="/";
    }
  return (
    <div className="hero min-h-screen bg-base-200">
  <div className="hero-content flex-col lg:flex-row">
    
    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <form className="card-body" onSubmit={handleSubmit}>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Email</span>
          </label>
          <input type="email" placeholder="email" className="input input-bordered" required />
        </div>
        <div className="form-control">
          <label className="label">
            <span className="label-text">Password</span>
          </label>
          <input type="password" placeholder="Password" className="input input-bordered" required />
          <label className="label">
            <a href="#" className="label-text-alt link link-hover"></a>
          </label>
        </div>
        <div className="form-control mt-6">
          <button className="btn btn-primary" type="submit">Login</button>
        </div>
      </form>
    </div>
    <div className="text-center lg:text-left">
      <img src={Cover} alt="Cover" className="lg:h-[600px] w-[500px] rounded-lg shadow-lg ml-3"/>
    </div>
  </div>
</div>
  )
}

export default Login