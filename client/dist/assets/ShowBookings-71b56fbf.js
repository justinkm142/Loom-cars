import{r as i,u as C,j as e,a as o,_ as r,o as p,b,h as B,P as I,M as P}from"./index-89e75b8d.js";function D(c){const[x,N]=i.useState(0),d=C(),h=t=>{r(s=>o("span",{children:["Are You Realy Want to Cancel Booking ? ",e("br",{}),o("div",{className:"flex justify-center gap-5 align-middle",children:[e("button",{className:"bg-green-500 w-20 h-10 rounded-lg",onClick:()=>r.dismiss(s.id),children:"Dismiss"}),e("button",{className:"bg-red-500 w-20 h-10 rounded-lg ",onClick:()=>{w(t),r.dismiss(s.id)},children:"Proceed"})]})]}))},w=async t=>{try{let s=localStorage.getItem("token"),a=p(s).userId;(await b({method:"patch",url:"/booking",data:{bookingId:t}})).data.message=="sucess"?(r.success("Updated Successfully"),c.getBookingList(a)):setError1("Please re-try after some time")}catch(s){console.log(s),r.error("Somthing Went Wrong!"),s.response.status==401&&(localStorage.clear(),d("/user/login"))}},k=async t=>{try{let s=localStorage.getItem("token"),a=p(s).userId;(await b({method:"patch",url:"/confirmBooking",data:{bookingId:t}})).data.message=="sucess"?(r.success("Updated Successfully"),c.getBookingList(a)):setError1("Please re-try after some time")}catch(s){console.log(s),r.error("Somthing Went Wrong!"),s.response.status==401&&(localStorage.clear(),d("/user/login"))}},v=(t,s,n)=>{r(a=>o("span",{children:["Please Enter OTP ",e("br",{}),e("input",{onChange:l=>N(()=>l.target.value),type:"Number",className:" my-5 border-2"}),e("br",{}),o("div",{className:"flex justify-center gap-5 align-middle",children:[e("button",{className:"bg-green-500 w-20 h-10 rounded-lg",onClick:()=>r.dismiss(a.id),children:"Dismiss"}),e("button",{className:"bg-red-500 w-20 h-10 rounded-lg ",onClick:()=>{x==s?(m(t,s,n),r.dismiss(a.id)):(r.dismiss(a.id),r.error("OTP Not Matching"))},children:"Submitt"})]})]}))},m=async(t,s,n)=>{try{let a=localStorage.getItem("token"),u=p(a).userId;(await b({method:"patch",url:"/hostBookingList",data:{bookingId:t,bookingStatus:n,OTP:s}})).data.message=="sucess"?(r.success("Updated Successfully"),c.getBookingList(u)):setError1("Please re-try after some time")}catch(a){console.log(a),r.error("Somthing Went Wrong!"),a.response.status==401&&(localStorage.clear(),d("/user/login"))}},f=async(t,s)=>{try{let n=localStorage.getItem("token"),l=p(n).userId;(await b({method:"patch",url:"/hostBookingList",data:{bookingId:t,bookingStatus:s}})).data.message=="sucess"?(r.success("Vehicle Accepted"),c.getBookingList(l)):setError1("Please re-try after some time")}catch(n){console.log(n),r.error("Somthing Went Wrong!"),n.response.status==401&&(localStorage.clear(),d("/user/login"))}};return e("div",{className:"overflow-x-auto",children:o("table",{className:"min-w-full divide-y-2 divide-gray-200 text-sm bg-white rounded-2xl border-2",children:[e("thead",{className:"ltr:text-left rtl:text-right",children:o("tr",{children:[e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Sl No."}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Name"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Car No."}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Phone"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Amount"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Booked Date"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Payment Status"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Booking Status"}),e("th",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900",children:"Action"}),e("th",{className:"px-4 py-2"})]})}),e("tbody",{className:"divide-y divide-gray-200",children:c.bookings.map((t,s)=>o("tr",{children:[e("td",{className:"whitespace-nowrap px-4 py-2 font-medium text-gray-900 text-center",children:10*(c.page-1)+s+1}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center",children:t.name}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center",children:t.carDetails.carNumber}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center",children:t.phone}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center",children:t.amount}),o("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center ",children:[t.datesBooked[0].startDate," to ",t.datesBooked[0].endDate]}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center ",children:t.paymentStatus}),e("td",{className:"whitespace-nowrap px-4 py-2 text-gray-700 text-center ",children:t.bookingStatus}),o("td",{className:"whitespace-nowrap px-4 py-2 flex justify-end text-gray-700 text-center ",children:[t.bookingStatus=="Booked"&&t.paymentStatus=="success"?o("div",{className:"",children:[e("button",{onClick:()=>{k(t._id)},className:"border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500 ",children:"Confirm"}),e("button",{onClick:()=>{h(t._id)},className:"border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500 ms-1",children:"Cancel"})]}):null,t.bookingStatus=="Booked"&&t.paymentStatus=="pending"?e("button",{onClick:()=>{h(t._id)},className:"border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500",children:"Cancel"}):null,t.bookingStatus=="Confirmed"?o("button",{onClick:()=>{v(t._id,t.OTP,"Handed Over")},className:"border p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500",children:["HandOver ",e("br",{}),"Vehicle"]}):null,t.bookingStatus=="Returned"?o("button",{onClick:()=>{f(t._id,"Completed")},className:"border p-1 px-3 rounded-lg hover:bg-slate-300 active:bg-slate-500",children:["Accept ",e("br",{}),"Vehicle"]}):null,e("button",{onClick:()=>{d("/user/bookingDetails/"+t._id)},className:"border ms-2 p-1 rounded-lg hover:bg-slate-300 active:bg-slate-500",children:"Details"})]})]},t._id))})]})})}function E(){const[c,x]=i.useState([]),[N,d]=i.useState(""),[h,w]=i.useState(!1),[k,v]=i.useState(""),[m,f]=i.useState(1),[t,s]=i.useState(0);let{vehicleId:n}=B();const a=C();let l;i.useEffect(()=>{let y=localStorage.getItem("token");if(!y)return a("/user/login");l=p(y).userId,u(l)},[h,m]);const u=async y=>{try{let g=await b({method:"get",url:"/hostBookingList",params:{userId:y,vehicleId:n,page:m}});g.data.message=="sucess"?(x(_=>[...g.data.result]),s(g.data.totalDocument)):d("Please re-try after some time")}catch(g){console.log(g),g.response.status==401&&(localStorage.clear(),a("/user/login"))}},S=()=>{w(!1)};return o("div",{className:"mb-10",children:[o("div",{className:"flex justify-between mb-4 px-10 pt-10",children:[e("h1",{className:"text-4xl mb-4 font-medium",children:"Car Bookings"}),o("div",{className:"",children:[e("button",{onClick:()=>a("/user/host"),className:"bg-green-500 p-2 text-white me-9 text-2xl shadow-2xl rounded-md w-48 active:bg-slate-800 hover:bg-green-800",children:"My Cars"}),e("button",{onClick:()=>a("/user/addVehicle"),className:"bg-green-600 p-2 text-white me-9 text-2xl shadow-2xl rounded-md w-48 active:bg-slate-800 hover:bg-green-800",children:"Start Earning"})]})]}),e(D,{bookings:c,changeUserStatus:()=>{},getBookingList:u,page:m}),c.length===0?null:e("div",{className:"mt-5",children:e(I,{setPage:f,totalDocument:t,page:m})}),e(P,{visible:h,carId:k,modalClose:S,userId:l,getCarDetails:u})]})}export{E as default};