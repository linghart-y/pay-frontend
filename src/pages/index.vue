<template>
  <q-page class="flex flex-center" padding>
    <div class="specification">

<h1>PW Application Overview</h1>
<p>The application is for Parrot Wings (PW, “internal money”) transfer between system users.</p>
<p>The application will be very “polite” and will inform a user of any problems (i.e. login not successful, not enough PW to remit the transaction, etc.)</p>
<h2>User registration</h2>
<p>Any person on Earth can register with the service for free, providing their Name (e.g. John Smith), valid email (e.g. jsmith@gmail.com) and password. </p>
<p>When a new user registers, the System will verify, that the user has provided a unique (not previously registered in the system) email, and also provided human name and a password. These 3 fields are mandatory. Password is to be typed twice for justification. No email verification required.</p>
<p>On successful registration every User will be awarded with 500 (five hundred) PW starting balance.</p>
<h2>Logging in</h2> 
<p>Users login to the system using their email and password.</p>
<p>Users will be able to Log out.</p>
<p>No password recovery, change password, etc. functions required.</p>
<h2>PW</h2>
<p>The system will allow users to perform the following operations:</p>
<ol>
	<li>See their Name and current PW balance always on screen</li>
	<li>
		Create a new transaction. To make a new transaction (PW payment) a user will
		<ul>
		<li>Choose the recipient by querying the  User list by name (autocomplete). </li>
		<li>When a recipient chosen, entering the PW transaction amount. The system will check that the transaction amount is not greater than the current user balance.</li>
		<li>Committing the transaction. Once transaction succeeded, the recipient account will be credited (PW++) by the entered amount of PW, and the payee account debited (PW--) for the same amount of PW. The system shall display PW balance changes immediately to the user.</li>
	</ul>
	</li>
	<li>(Optional) Create a new transaction as a copy from a list of their existing transactions: create a handy UI for a user to browse their recent transactions, and select a transaction as a basis for a new transaction. Once old transaction selected, all its details (recipient, PW amount) will be copied to the new transaction.
	</li>
	<li>
		Review a list (history) of their transactions. A list of transactions will show the most recent transactions on top of the list and display the following info for each transaction:
		<ul>
			<li>Date/Time of the transaction</li>			
			<li>Correspondent Name</li>			
			<li>Transaction amount, (Debit/Credit  for PW transferred)</li>			
			<li>Resulting balance</li>
		</ul>
		(Optional) Implement filtering and/or sorting of transaction list by date, correspondent name and amount. 
	</li>

</ol>

<h2>Administrative Panel</h2>
<p>The system will allow administrative user to perform the following operations:</p>
<ol>
	<li>List/View/Edit users with BAN option; List should be filterable and sortable</li>
	<li>List/View/Edit PW transactions; List should be filterable and sortable</li>
</ol>
<p>Administrative user should be predefined.</p>

<h1>Technical requirements</h1>
Use the following software:
<ol>
	<li>
		Server side
		<ul>
			<li>DB - your suggests</li>
			<li>PHP</li>
			<li>
				PHP frameworks - your suggests.
				<ul>
					<li>ORM</li>
					<li>CMS</li>
					<li>Administrative boilerplate</li>
					<li>Business Entity generation</li>
				</ul>
			</li>
			<li>RESTfull or JSON WEB API is preferable not mandatory</li>
		</ul>
	</li>
	<li>
		WEB HTML client
		<ul>
			<li>HTML5</li>
			<li>Javascript or TypeScript</li>
			<li>MVC, SPA - your suggests, SPA is is preferable not mandatory </li>
			<li>bootstrap</li>
		</ul>
	</li>
</ol>

<h1>UI design requirements</h1>
<p>Customer likes Material Design approach as well as native Mac OS look'n feel.</p>
<p>It is necessary to design and implement unique UI look'n feel for the front-end applications, for every UI elements, and (optionally) apply it to developed frontend application.</p>

    </div>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  	
  }
}
</script>
