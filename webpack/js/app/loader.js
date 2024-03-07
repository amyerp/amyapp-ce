export function getsession() {

  get(SessonKey, SessionStore).then(result => {

  //	console.log(result);
  	 var ses = 0;
  	 var token = "";

  	  if (result !== undefined) {
  	 var session = JSON.parse(result);
  	 var token = session.token;
     var companyid = session.companyid;
     var sessionexpiration = session.sessionexp * 1000
     var timeInMs = Date.now();

     if (sessionexpiration > timeInMs) {

       var ses = 1;
     } else {
       clear(SessionStore);
       var queryString = window.location.search;
       console.log("location: ", queryString);
       set("location", queryString, SessionStore)
           .then(() => console.log('Location saved'))
           .catch(err => console.log('Location  failed!', err));
       document.location.href = '/';
     }

     if (!session.emailconf) {
       var ses = 2;
     }
  			 }
  			 var path = getpagepath();
         getversion(token)

  			 switch(path) {
  				 case "/":
  										pagebuilder(ses)
                      dashboardbuilder(ses)
                      tokensign(ses)

  				  break;
            case "/forgot/":
   										forgotbuilder(ses)

   				  break;
            case "/create_my_account/":
                      pagebuilder(ses)
   									  createmycompanyloader(ses)

   				  break;
            case "/company_profile/":
                      pagebuilder(ses)
                      companyprofilebuilder(ses)


            break;
            case "/account_profile/":
                      pagebuilder(ses)
                      accountprofilebuilder(ses)

            break;
            case "/my_accounts/":
                      pagebuilder(ses)
                      accountsbuilder(ses)

            break;
            case "/companies/":
                      pagebuilder(ses)
                      companiesbuilder(ses)

            break;
            case "/add_payment/":
                      pagebuilder(ses)
                      addpaymentloader(ses)

            break;
            case "/add_income/":
                      pagebuilder(ses)
                      addincomeloader(ses)

            break;
            case "/persons/":
                      pagebuilder(ses)
                      personsbuilder(ses)

            break;
            case "/create_company/":
                      pagebuilder(ses)
   									  createcompanyloader(ses)

   				  break;
            case "/add_person/":
                      pagebuilder(ses)
   									  addpersonloader(ses)

   				  break;
            case "/person_profile/":
                      pagebuilder(ses)
                      personprofilebuilder(ses)

            break;
            case "/create_invoice/":
                      pagebuilder(ses)
   									  createinvoiceloader(ses, companyid)

   				  break;
            case "/import_outgoing_invoice/":
                      pagebuilder(ses)
   									  createinvoiceloader(ses, companyid)

   				  break;
            case "/outgoing_invoice/":
                      pagebuilder(ses)
   									  showinvoiceloader(ses)

   				  break;
            case "/incoming_invoice/":
                      pagebuilder(ses)
   									  showincominginvoiceloader(ses)

   				  break;
            case "/add_incoming_invoice/":
                      pagebuilder(ses)
   									  addincominginvoiceloader(ses, companyid)
   				  break;
            case "/confirmemail/":
                      pagebuilder(ses)
   									  confirmemailloader()

   				  break;
            case "/outgoing_invoices/":
                      pagebuilder(ses)
   									  outgoinginvoiceloader(ses)

   				  break;
            case "/incoming_invoices/":
                      pagebuilder(ses)
   									  incominginvoiceloader(ses)

   				  break;
            case "/agreements/":
                      pagebuilder(ses)
                      agreementsloader(ses)

            break;
            case "/incomes/":
                      pagebuilder(ses)
                      incomesloader(ses)

            break;
            case "/income/":
                      pagebuilder(ses)
                      incomeloader(ses)

            break;
            case "/import_agreement/":
                      pagebuilder(ses)
   									  importagreementloader(ses, companyid)

   				  break;
            case "/agreement/":
                      pagebuilder(ses)
                      showagreementloader(ses)

            break;
            case "/edit_invoice/":
                      pagebuilder(ses)
                      editinvoiceloader(ses)

            break;
            case "/incoming_mails/":
                      pagebuilder(ses)
                      incomesmailloader(ses)

            break;
            case "/add_incoming_mail/":
                      pagebuilder(ses)
                      addincommailloader(ses)
            break;
            case "/incoming_mail/":
                      pagebuilder(ses)
                      incomemailloader(ses)

            break;
            case "/outgoing_mails/":
                      pagebuilder(ses)
                      ioutgoingmailsloader(ses)

            break;
            case "/add_outgoing_mail/":
                      pagebuilder(ses)
                      addoutgoingmailloader(ses)
            break;
            case "/outgoing_mail/":
                      pagebuilder(ses)
                      outgoingmailloader(ses)

            break;
            case "/payments/":
                      pagebuilder(ses)
                      paymentsloader(ses)

            break;
            case "/payment/":
                      pagebuilder(ses)
                      showpaymentloader(ses)

            break;
            case "/currencies/":
                      pagebuilder(ses)
                      currenciesloader(ses)

            break;
            case "/languages/":
                      pagebuilder(ses)
                      languagesloader(ses)

            break;
            case "/cryptocurrencies/":
                      pagebuilder(ses)
                      cryptocurrenciesloader(ses)

            break;
            case "/account_charts/":
                      pagebuilder(ses)
                      account_chart_typeloader(ses)

            break;
            case "/steatments/":
                      pagebuilder(ses)
                      steatmentsloader(ses)

            break;
            case "/countries_and_cities/":
                      pagebuilder(ses)
                      countriesloader(ses)

            break;
            case "/company_types/":
                      pagebuilder(ses)
                      companytypesloader(ses)

            break;
            case "/vats/":
                      pagebuilder(ses)
                      vatsloader(ses)
            break;
            case "/customers/":
                      pagebuilder(ses)
                      customersloader(ses)
            break;
            case "/staff/":
                      pagebuilder(ses)
                      staffsloader(ses)
            break;
            case "/staff_card/":
                      pagebuilder(ses)
                      staffcardloader(ses)
            break;
            case "/general_ledger/":
                      pagebuilder(ses)
                      glloader(ses)
            break;
            case "/object_connections/":
                      pagebuilder(ses)
                      objectconnectloader(ses)
            break;
            case "/loans/":
                      pagebuilder(ses)
                      loansloader(ses)
            break;
            case "/create_loan/":
                      pagebuilder(ses)
                      addloanloader(ses)
            break;
            case "/loan/":
                      pagebuilder(ses)
                      showloanloader(ses)
            break;
            case "/transfers/":
                      pagebuilder(ses)
                      showtransfersloader(ses)
            break;
            case "/add_transfer/":
                      pagebuilder(ses)
                      addransferloader(ses)
            break;
            case "/transfer/":
                      pagebuilder(ses)
                      transferloader(ses)
            break;
            case "/fixed_assets/":
                      pagebuilder(ses)
                      fixedassetsloader(ses)
            break;
            case "/add_fixed_asset/":
                      pagebuilder(ses)
                      addfixedassetsloader(ses)
            break;
            case "/fixed_asset/":

                      pagebuilder(ses)
                      showfixedassetloader(ses)
            break;
            break;
            case "/warehouses/":
                      pagebuilder(ses)
                      warehousesloader(ses)

            break;
            case "/wms_products/":
                      pagebuilder(ses)
                      warehousesloader(ses)


            break;
            case "/delivery_orders/":
                      pagebuilder(ses)
                      warehousesloader(ses)

            break;


  				 default:
           console.log("default");
  						       pagebuilder(ses)
  				  break;
  					 };

  });

  }
