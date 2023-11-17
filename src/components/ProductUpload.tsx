

const ProductUpload = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
    <div className="hero-content flex-col lg:flex-row-reverse">
      <div className="text-center lg:text-left">
        <h1 className="text-5xl font-bold">Thank You for Choosing us</h1>
        <p className="py-6">Forge meaningful connections with your customers through our user-friendly product upload feature! 🚀 Strengthen the bond between your business and clients as you effortlessly showcase and sell. Your success is our partnership. 🌐💼 #EmpowerTogether #BusinessBondi</p>
      </div>
      <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
        <form className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text">Title</span>
            </label>
            <input type="text" placeholder="Title" className="input input-bordered" required />
          </div>
          <div className="form-control items-center flex justify-evenly">
            <label className="label">
              <span className="label-text">Image</span>
            </label>
            <input type="file" accept="image/*"  className="input input-bordered flex justify-evenly" required />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Decription</span>
            </label>
            <textarea placeholder="description for the product" name="description" className="input input-bordered" required />
            
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Category</span>
            </label>
            <input type="text" placeholder="Category" className="input input-bordered" required />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Price</span>
            </label>
            <input type="number" placeholder="price" className="input input-bordered" required />
          </div>
          <div className="form-control mt-6">
            <button className="btn btn-primary">Create</button>
          </div>
        </form>
      </div>
    </div>
  </div>
  )
}

export default ProductUpload