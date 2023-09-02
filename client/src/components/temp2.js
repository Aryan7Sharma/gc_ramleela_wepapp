// // src/components/ResponsiveForm.js
// import { useState } from 'react';
// import { Formik, Form, Field, ErrorMessage } from 'formik';
// import * as Yup from 'yup';

// const validationSchema = Yup.object().shape({
//     name: Yup.string().required('Name is required'),
//     email: Yup.string().email('Invalid email').required('Email is required'),
// });

// const ResponsiveNavbar = () => {

//     const [userDropdownOpen, setUserDropdownOpen] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     const toggleUserDropdown = () => {
//         setUserDropdownOpen(!userDropdownOpen);
//     };

//     const toggleMobileMenu = () => {
//         setMobileMenuOpen(!mobileMenuOpen);
//     };

//     const handleSubmit = (values, actions) => {
//         // Handle form submission
//         console.log(values);
//         actions.setSubmitting(false);
//     };

//     return (
//         <nav className='relative'>
//             <header className="bg-white border-gray-200 dark:bg-gray-900">
//                 <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
//                     <a href="https://flowbite.com/" className="flex items-center">
//                         <img
//                             src="./WhatsApp Image 2023-08-11 at 4.21.35 PM.jpeg"
//                             className="h-12 mr-3"
//                             alt="Logo"
//                         />
//                         <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
//                             GCR Trust
//                         </span>
//                     </a>
//                     <div className="flex items-center md:order-2">
//                         <button
//                             type="button"
//                             className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
//                             id="user-menu-button"
//                             aria-expanded={userDropdownOpen}
//                             onClick={toggleUserDropdown}
//                         >
//                             <span className="sr-only">Open user menu</span>
//                             <img
//                                 className="w-8 h-8 rounded-full"
//                                 src="https://media.licdn.com/dms/image/C5603AQEU0oBTghtKYA/profile-displayphoto-shrink_800_800/0/1650952862670?e=2147483647&v=beta&t=AkKqr9YGHjqzatpA5tMheknxSHWBtO6VATH9To0MQ6Q"
//                                 alt="User"
//                             />
//                         </button>
//                         <div
//                             className={`${
//                                 userDropdownOpen ? "block" : "hidden"
//                               } origin-top-right top-14 absolute right-10 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none transition-opacity duration-300`}
//                               style={{ zIndex: userDropdownOpen ? 1 : -1 }}
//                         >
//                             <div
//                                 className="py-1"
//                                 role="menu"
//                                 aria-orientation="vertical"
//                                 aria-labelledby="user-menu"
//                             >
//                                 <a
//                                     href="#"
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     role="menuitem"
//                                 >
//                                     Your Profile
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     role="menuitem"
//                                 >
//                                     Settings
//                                 </a>
//                                 <a
//                                     href="#"
//                                     className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     role="menuitem"
//                                 >
//                                     Sign out
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-user">
//                         <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
//                             <li>
//                                 <a href="/" className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 md:dark:text-blue-500" aria-current="page">Home</a>
//                             </li>
//                             <li>
//                                 <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">About</a>
//                             </li>
//                             <li>
//                                 <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Services</a>
//                             </li>
//                             <li>
//                                 <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Pricing</a>
//                             </li>
//                             <li>
//                                 <a href="/" className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">Contact</a>
//                             </li>
//                         </ul>
//                     </div>
//                 </div>
//             </header>

//             {/* hero section */}

//             <hero id="default-carousel" className="w-full" data-carousel="slide">
//                 {/* <!-- Carousel wrapper --> */}
//                 <div className='w-full'>
//                     <div className="relative h-56 overflow-hidden  md:h-96">
//                         {/* <!-- Item 1 --> */}
//                         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                             <img src="https://imgk.timesnownews.com/story/rrrrn.png?tr=w-600,h-450,fo-auto" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 w-fit = width: fit-content" alt="..." />
//                         </div>
//                         {/* <!-- Item 2 --> */}
//                         <div className=" hidden duration-700 ease-in-out" data-carousel-item>
//                             <img src="https://imgk.timesnownews.com/story/rrrrn.png?tr=w-600,h-450,fo-auto" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//                         </div>
//                         {/* <!-- Item 3 --> */}
//                         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                             <img src="https://imgk.timesnownews.com/story/rrrrn.png?tr=w-600,h-450,fo-auto" className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="..." />
//                         </div>
//                         {/* <!-- Item 4 --> */}
//                         <div className=" duration-700 ease-in-out " data-carousel-item>
//                             <img src="https://static.langimg.com/photo/imgsize-43578,msid-91136772/navbharat-times.jpg" className="absolute h-full w-full width:fit-content" alt="..." />
//                         </div>
//                         {/* <!-- Item 5 --> */}
//                         <div className="hidden duration-700 ease-in-out" data-carousel-item>
//                             <img src="https://rukminim1.flixcart.com/image/850/1000/l1whaq80/painting/n/a/k/14-1-dbrush-d216laminated-dbrush-original-imagdd7yhvk9swfd.jpeg?q=90" className="absolute " alt="..." />
//                         </div>
//                     </div>
//                 </div>
//                 {/* <!-- Slider indicators --> */}
//                 <div className="absolute z-30 flex space-x-3 -translate-x-1/2 bottom-5 left-1/2">
//                     <button type="button" className="w-3 h-3 rounded-full" aria-current="true" aria-label="Slide 1" data-carousel-slide-to="0"></button>
//                     <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 2" data-carousel-slide-to="1"></button>
//                     <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 3" data-carousel-slide-to="2"></button>
//                     <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 4" data-carousel-slide-to="3"></button>
//                     <button type="button" className="w-3 h-3 rounded-full" aria-current="false" aria-label="Slide 5" data-carousel-slide-to="4"></button>
//                 </div>
//                 {/* <!-- Slider controls --> */}
//                 <button type="button" className=" hidden absolute top-0 left-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-prev>
//                     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                         <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 1 1 5l4 4" />
//                         </svg>
//                         <span className="sr-only">Previous</span>
//                     </span>
//                 </button>
//                 <button type="button" className="hidden absolute top-0 right-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none" data-carousel-next>
//                     <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30 group-hover:bg-white/50 dark:group-hover:bg-gray-800/60 group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70 group-focus:outline-none">
//                         <svg className="w-4 h-4 text-white dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
//                             <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
//                         </svg>
//                         <span className="sr-only">Next</span>
//                     </span>
//                 </button>
//             </hero>

//             {/* Feature section */}
//             <div>
//                 <p className="text-gray-500 dark:text-gray-400"></p>
//                 <div className="inline-flex items-center justify-center w-full">
//                     <hr className="w-64 h-1 my-8 bg-gray-200 border-0 rounded dark:bg-gray-700" />
//                     <div className="absolute px-4 -translate-x-1/2 bg-white left-1/2 dark:bg-gray-900">
//                         <svg className="w-4 h-4 text-gray-700 dark:text-gray-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
//                             <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
//                         </svg>
//                     </div>
//                 </div>
//                 <h1 className="text-gray-500 dark:text-gray-500 flex items-center justify-center text-3xl">Our Features's</h1>
//             </div>

//             {/* card component */}
//             <card className="flex flex-col mx-5 gap-5 sm:flex-row justify-evenly my-10">

//                 <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                     <a href="#">
//                         <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
//                     </a>
//                     <div class="p-5">
//                         <a href="#">
//                             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                         </a>
//                         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Enter your text here.</p>
//                         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                             Click here
//                             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>

//                 <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                     <a href="#">
//                         <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
//                     </a>
//                     <div class="p-5">
//                         <a href="#">
//                             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                         </a>
//                         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Enter your text here.</p>
//                         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                             Click here
//                             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>

//                 <div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//                     <a href="#">
//                         <img class="rounded-t-lg" src="https://flowbite.com/docs/images/blog/image-1.jpg" alt="" />
//                     </a>
//                     <div class="p-5">
//                         <a href="#">
//                             <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
//                         </a>
//                         <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">Enter your text here.</p>
//                         <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
//                             Click here
//                             <svg class="w-3.5 h-3.5 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                             </svg>
//                         </a>
//                     </div>
//                 </div>

//             </card>





//             {/* Footer */}

//             <footer className=" left-0 z-20 w-full p-4 border-t border-gray-200 shadow dark:bg-gray-900 mt-100">
//                 <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
//                     <div className="md:flex md:justify-between">
//                         <div className="mb-6 md:mb-0">
//                             <a href="https://flowbite.com/" className="flex items-center">
//                                 <img src="./WhatsApp Image 2023-08-11 at 4.21.35 PM.jpeg" className="h-20 w-60 mr-3" alt="Logo" />
//                                 {/* <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">GCR Trust</span> */}
//                             </a>
//                         </div>
//                         <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Resources</h2>
//                                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                                     <li className="mb-4">
//                                         <a href="https://flowbite.com/" className="hover:underline">Flowbite</a>
//                                     </li>
//                                     <li>
//                                         <a href="https://tailwindcss.com/" className="hover:underline">Tailwind CSS</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
//                                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                                     <li className="mb-4">
//                                         <a href="https://github.com/themesberg/flowbite" className="hover:underline ">Github</a>
//                                     </li>
//                                     <li>
//                                         <a href="https://discord.gg/4eeurUVvTy" className="hover:underline">Discord</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                             <div>
//                                 <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Legal</h2>
//                                 <ul className="text-gray-500 dark:text-gray-400 font-medium">
//                                     <li className="mb-4">
//                                         <a href="/" className="hover:underline">Privacy Policy</a>
//                                     </li>
//                                     <li>
//                                         <a href="/" className="hover:underline">Terms &amp; Conditions</a>
//                                     </li>
//                                 </ul>
//                             </div>
//                         </div>
//                     </div>
//                     <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
//                     <div className="sm:flex sm:items-center sm:justify-between">
//                         <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://flowbite.com/" className="hover:underline">Flowbite™</a>. All Rights Reserved.
//                         </span>
//                         <div className="flex mt-4 space-x-5 sm:justify-center sm:mt-0">
//                             <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 8 19">
//                                     <path fillRule="evenodd" d="M6.135 3H8V0H6.135a4.147 4.147 0 0 0-4.142 4.142V6H0v3h2v9.938h3V9h2.021l.592-3H5V3.591A.6.6 0 0 1 5.592 3h.543Z" clipRule="evenodd" />
//                                 </svg>
//                                 <span className="sr-only">Facebook page</span>
//                             </a>
//                             <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 21 16">
//                                     <path d="M16.942 1.556a16.3 16.3 0 0 0-4.126-1.3 12.04 12.04 0 0 0-.529 1.1 15.175 15.175 0 0 0-4.573 0 11.585 11.585 0 0 0-.535-1.1 16.274 16.274 0 0 0-4.129 1.3A17.392 17.392 0 0 0 .182 13.218a15.785 15.785 0 0 0 4.963 2.521c.41-.564.773-1.16 1.084-1.785a10.63 10.63 0 0 1-1.706-.83c.143-.106.283-.217.418-.33a11.664 11.664 0 0 0 10.118 0c.137.113.277.224.418.33-.544.328-1.116.606-1.71.832a12.52 12.52 0 0 0 1.084 1.785 16.46 16.46 0 0 0 5.064-2.595 17.286 17.286 0 0 0-2.973-11.59ZM6.678 10.813a1.941 1.941 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.919 1.919 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Zm6.644 0a1.94 1.94 0 0 1-1.8-2.045 1.93 1.93 0 0 1 1.8-2.047 1.918 1.918 0 0 1 1.8 2.047 1.93 1.93 0 0 1-1.8 2.045Z" />
//                                 </svg>
//                                 <span className="sr-only">Discord community</span>
//                             </a>
//                             <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 17">
//                                     <path fillRule="evenodd" d="M20 1.892a8.178 8.178 0 0 1-2.355.635 4.074 4.074 0 0 0 1.8-2.235 8.344 8.344 0 0 1-2.605.98A4.13 4.13 0 0 0 13.85 0a4.068 4.068 0 0 0-4.1 4.038 4 4 0 0 0 .105.919A11.705 11.705 0 0 1 1.4.734a4.006 4.006 0 0 0 1.268 5.392 4.165 4.165 0 0 1-1.859-.5v.05A4.057 4.057 0 0 0 4.1 9.635a4.19 4.19 0 0 1-1.856.07 4.108 4.108 0 0 0 3.831 2.807A8.36 8.36 0 0 1 0 14.184 11.732 11.732 0 0 0 6.291 16 11.502 11.502 0 0 0 17.964 4.5c0-.177 0-.35-.012-.523A8.143 8.143 0 0 0 20 1.892Z" clipRule="evenodd" />
//                                 </svg>
//                                 <span className="sr-only">Twitter page</span>
//                             </a>
//                             <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 .333A9.911 9.911 0 0 0 6.866 19.65c.5.092.678-.215.678-.477 0-.237-.01-1.017-.014-1.845-2.757.6-3.338-1.169-3.338-1.169a2.627 2.627 0 0 0-1.1-1.451c-.9-.615.07-.6.07-.6a2.084 2.084 0 0 1 1.518 1.021 2.11 2.11 0 0 0 2.884.823c.044-.503.268-.973.63-1.325-2.2-.25-4.516-1.1-4.516-4.9A3.832 3.832 0 0 1 4.7 7.068a3.56 3.56 0 0 1 .095-2.623s.832-.266 2.726 1.016a9.409 9.409 0 0 1 4.962 0c1.89-1.282 2.717-1.016 2.717-1.016.366.83.402 1.768.1 2.623a3.827 3.827 0 0 1 1.02 2.659c0 3.807-2.319 4.644-4.525 4.889a2.366 2.366 0 0 1 .673 1.834c0 1.326-.012 2.394-.012 2.72 0 .263.18.572.681.475A9.911 9.911 0 0 0 10 .333Z" clipRule="evenodd" />
//                                 </svg>
//                                 <span className="sr-only">GitHub account</span>
//                             </a>
//                             <a href="/" className="text-gray-500 hover:text-gray-900 dark:hover:text-white">
//                                 <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
//                                     <path fillRule="evenodd" d="M10 0a10 10 0 1 0 10 10A10.009 10.009 0 0 0 10 0Zm6.613 4.614a8.523 8.523 0 0 1 1.93 5.32 20.094 20.094 0 0 0-5.949-.274c-.059-.149-.122-.292-.184-.441a23.879 23.879 0 0 0-.566-1.239 11.41 11.41 0 0 0 4.769-3.366ZM8 1.707a8.821 8.821 0 0 1 2-.238 8.5 8.5 0 0 1 5.664 2.152 9.608 9.608 0 0 1-4.476 3.087A45.758 45.758 0 0 0 8 1.707ZM1.642 8.262a8.57 8.57 0 0 1 4.73-5.981A53.998 53.998 0 0 1 9.54 7.222a32.078 32.078 0 0 1-7.9 1.04h.002Zm2.01 7.46a8.51 8.51 0 0 1-2.2-5.707v-.262a31.64 31.64 0 0 0 8.777-1.219c.243.477.477.964.692 1.449-.114.032-.227.067-.336.1a13.569 13.569 0 0 0-6.942 5.636l.009.003ZM10 18.556a8.508 8.508 0 0 1-5.243-1.8 11.717 11.717 0 0 1 6.7-5.332.509.509 0 0 1 .055-.02 35.65 35.65 0 0 1 1.819 6.476 8.476 8.476 0 0 1-3.331.676Zm4.772-1.462A37.232 37.232 0 0 0 13.113 11a12.513 12.513 0 0 1 5.321.364 8.56 8.56 0 0 1-3.66 5.73h-.002Z" clipRule="evenodd" />
//                                 </svg>
//                                 <span className="sr-only">Dribbble account</span>
//                             </a>
//                         </div>
//                     </div>
//                 </div>
//             </footer>


//         </nav>

//     );
// };

// export default ResponsiveNavbar;


import React, { useState } from 'react';
import {Navbar,Footer} from "./index"
const TabbedNavigation = ({ tables, defaultTable, onTableSelect }) => {
  const [selectedTable, setSelectedTable] = useState(defaultTable);

  const handleTabClick = (table) => {
    setSelectedTable(table);
    onTableSelect(table);
  };

  return (
    <div>
    <div className="grid grid-cols-3 gap-2 mx-4 my-5 sm:flex justify-center border-b">
      {tables.map((table,index) => (
        <button
          key={index}
          onClick={() => handleTabClick(table)}
          className={`px-4 py-2 focus:outline-none border-2 ${
            selectedTable === table ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'
          }`}
        >
          {table}
          {index < tables.length - 1 && <span className="h-4 mx-2 bg-gray-300 inline-block"></span>}
        </button>
        
      ))}
    </div>
    </div>
  );
};

export default TabbedNavigation;

