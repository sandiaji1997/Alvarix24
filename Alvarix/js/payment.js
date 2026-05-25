async function payNow(){
 const user = requireLogin();

 if(!user){
   return;
 }

 const merchantName =
 document.getElementById("merchantName").value;

 const amount = Number(
 document.getElementById("amount").value
 );

 if(!merchantName || !amount){
   alert("Lengkapi data pembayaran");
   return;
 }

 const transaction = {
   transactionId: "TXN-" + Date.now(),
   merchantName: merchantName,
   amount: amount,
   userId: user.email
 };

 try {
   const response = await fetch(`${API_BASE_URL}/transactions`, {
     method: "POST",
     headers: {
       "Content-Type": "application/json"
     },
     body: JSON.stringify(transaction)
   });

   const result = await response.json();

   if(!response.ok){
     throw new Error(result.error || "Transaksi gagal");
   }

   localStorage.setItem(
     "transaction",
     JSON.stringify(result.data)
   );
 } catch (error) {
   alert("Gagal menyimpan ke server: " + error.message);
   return;
 }

 window.location.href =
   "payment-success.html";
}
