var id1, id2;

$(document).ready(function(){
    animateDiv();

});

function makeNewPosition(){
    
    // Get viewport dimensions (remove the dimension of the div)
    var h = $(window).height() - 50;
    var w = $(window).width() - 50;
    
    var nh = Math.floor(Math.random() * h);
    var nw = Math.floor(Math.random() * w);
    
    return [nh,nw];
    
}

function animateDiv(){
    var arr = ['a','b','c','d','e','f','g','h','i','j','k','l'];
    arr.forEach(great => {
        var newq = makeNewPosition();
        var oldq = $('.' + great).offset();
        var speed = calcSpeed([oldq.top, oldq.left], newq);
        
        $('.' + great).animate({ top: newq[0], left: newq[1] }, speed, function(){
            animateDiv();        
        });

        $('.' + great).click(function(e) {
            if ($(this).attr('called') != 'true') {
                $(this).attr('called', 'true');

                if (!id1) {
                    id1 = $(this).attr('id');
                    $(this).find('img').css('display', 'block');
                } else if (!id2) {
                    id2 = $(this).attr('id');
                    $(this).find('img').css('display', 'block');

                    // Match
                    if (id1 < 7 && id2 < 7 || id1 > 6 && id2 > 6) {
                        setTimeout(function() {
                            $('#' + id1).css('display', 'none');
                            $('#' + id2).css('display', 'none');
                            id1 = id2 = null;

                            const score = parseInt($('#score').attr('score'));
                            $('#score').attr('score', score + 10);
                            $('#score').text(score + 10);

                            if (score + 10 == 60) {
                                setTimeout(function() {
                                    alert('The game is over!');
                                    window.location.reload();
                                }, 500);
                            }
                        }, 500);
                    } else {
                        // Wrong
                        setTimeout(function() {
                            $('#'+id1).find('img').css('display', 'none');
                            $('#'+id2).find('img').css('display', 'none');
                            $('#'+id1).attr('called', null);
                            $('#'+id2).attr('called', null);
                            id1 = id2 = null;
                        }, 500);
                    }

                }
            }
        });
    });
    
    
    
};


function calcSpeed(prev, next) {
    
    var x = Math.abs(prev[1] - next[1]);
    var y = Math.abs(prev[0] - next[0]);
    
    var greatest = x > y ? x : y;
    
    var speedModifier = 0.1;

    var speed = Math.ceil(greatest/speedModifier);

    return speed;

}

