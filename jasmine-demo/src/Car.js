var Car = function() {
    this.color = 'red';
    
    this.make = 'Ford';
    
    this.drive = function() {
        return 'driving...';
    },
    
    this.paint = function(color, callback) {
        var carContext = this;
        
        setTimeout(function() {
            carContext.color = color;
            
            callback();
        }, 2000);
    },
    
    this.changeTire = function(tire) {
        return 'Changing tire ' + tire;
    },
    
    this.changeTires = function() {
        for (var i = 0; i < 4; i++) {
            this.changeTire();
        }
    }
}