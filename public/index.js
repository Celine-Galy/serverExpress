//const $document = $(document);
const $inputSearch = $('#input-search');
const $tableBody = $('#table-body');


$(document).on('click','#btn-search',()=>{
   searchData();
    console.log('click on search');
});

$(document).on('keyup','#input-search',(key)=>{
   searchData(); 
   });

   function searchData() {
const search = $inputSearch.val();
console.log({search});

if(search) {
    $.get('/search?search=' + search, (products) => {
      const templateProductRows = $('#template-rows').html();
      const template = Handlebars.compile(templateProductRows);
      const rendererHtml = template({products: products});
        // execute the compiled template and print the output to the console
        $tableBody.html(rendererHtml);
    });
} else {
    document.location = '';
}
}
