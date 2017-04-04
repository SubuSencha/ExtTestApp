describe("List-Test.js", function() {
    var grid;
    
    var dataOverrides = {
        '/data/personnel': {
            type: 'json',
            data: [
                { name: 'Jean Luc', email: "jeanluc.picard@enterprise.com", phone: "555-111-1111" },
                { name: 'Worf',     email: "worf.moghsson@enterprise.com",  phone: "555-222-2222" }
            ]
        }
    };
    
    var setupMockData = function() {
        Ext.ux.ajax.SimManager.init({
            delay: 300
        }).register(dataOverrides);
    }
    
    beforeAll(function(done) {
        Ext.require('Ext.ux.ajax.SimManager', function() {
            setupMockData();
            
            done();
        }) 
    });
    
    beforeEach(function () {
        grid = Ext.create({
            xtype: 'mainlist',
            renderTo: Ext.getBody(),
            multiColumnSort: true,
            syncRowHeight: false,
            width: 800,
            height: 300,
            title: 'Grid Test',
            loadMask: true,
            viewConfig: {
                trackOver: false
            }
        });
    });
    
    afterEach(function () {
        Ext.destroy(grid);
    });
 
    describe("sorting", function() {
        it("should sort ASC when clicking on Name header", function() {
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click()
                .and(function() {
                    var columns = grid.getColumns();
            
                    expect(columns[0].sortState).toBe("ASC");
                });
        });
        
        it("Ascending sorted grid should be in ascending order", function() {
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click();
            
            var record1Title,
                record2Title;
                
            ST.grid('mainlist')
                .rowAt(0)
                .cellAt(0)
                .get('textContent')
                .and(function() {
                    record1Title = this.future.data.textContent;
                });
                
            ST.grid('mainlist')
                .rowAt(1)
                .cellAt(0)
                .get('textContent')
                .and(function() {
                    record2Title = this.future.data.textContent;
                    
                    expect(record2Title).toBeGreaterThan(record1Title);
                });
        });
        
        it("should sort DESC when re-clicking on Name header", function(){
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click();
                
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click()
                .and(function() {
                    var columns = grid.getColumns();
            
                    expect(columns[0].sortState).toBe("DESC");
                });
        });
        
        it("Descending sorted grid should be in descending order", function() {
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click();
                
            ST.component("mainlist gridcolumn[dataIndex=name]")
                .click();
            
            var record1Title,
                record2Title;
                
            ST.grid('mainlist')
                .rowAt(0)
                .cellAt(0)
                .get('textContent')
                .and(function() {
                    record1Title = this.future.data.textContent;
                });
                
            ST.grid('mainlist')
                .rowAt(1)
                .cellAt(0)
                .get('textContent')
                .and(function() {
                    record2Title = this.future.data.textContent;
                    
                    expect(record1Title).toBeGreaterThan(record2Title);
                });
        });
    });
});