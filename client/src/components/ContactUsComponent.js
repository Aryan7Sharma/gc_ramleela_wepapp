
const ContactUsComponent = () => {
  const contactInfo = {
    address: 'Greater Noida, Uttar Pradesh, India',
    phone: '+91 96439 76677',
    email: 'Shreeramleela.gnw@gmail.com',
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow-md w-full sm:w-3/4 md:w-1/2 lg:w-1/3">
        <h1 className="text-2xl font-semibold mb-4">Contact Us</h1>
        <div className="mb-6">
          <p className="text-gray-700">Feel free to reach out to us:</p>
          <p className="text-gray-700">{contactInfo.address}</p>
          <p className="text-gray-700">{contactInfo.phone}</p>
          <p className="text-gray-700">{contactInfo.email}</p>
        </div>
        <form>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="name">Name</label>
            <input className="w-full p-2 border rounded" type="text" id="name" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="email">Email</label>
            <input className="w-full p-2 border rounded" type="email" id="email" />
          </div>
          <div className="mb-4">
            <label className="block mb-2 font-semibold" htmlFor="message">Message</label>
            <textarea className="w-full p-2 border rounded" id="message" rows="4"></textarea>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUsComponent;
