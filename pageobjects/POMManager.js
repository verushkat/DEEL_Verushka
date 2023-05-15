const {SearchPage} = require('./SearchPage');


class POMManager
{
    constructor(page)
    {
        this.page = page;
        this.searchPage = new SearchPage(this.page);
    }

   getSearchPage()
   {
    return this.searchPage;    
   }

  

}
module.exports = {POMManager};