$(document).ready(function(){
    $(".menu-principal .nav .nav-item").each(function(){
        var largura = $(this).innerWidth();
        $(this).find(".dropdown-menu").css("width",largura);
    });

    $(function(){
        let larguraCard = $(".card:first").width();
        let alturaCard = $(".card:first").height();
        let larguraImg = $(".card-img:first").width();
        let alturaImg = $(".card-img:first").height();
        $(".card-img-top").width(larguraImg).height(alturaImg);
        $(".video-img").width(larguraCard).height(alturaCard);
     });


    //menu
    // (function(){
    //     var nav_menu = $(".menu-principal .nav"),
    //     item_menu = $(".menu-principal .nav .nav-item"),
    //     quantidade_itens = item_menu.length,
    //     limite = 4;

    //     quantidade_itens > limite ? (
    //         nav_menu.addClass("mais-itens")
    //     ) : ( null )

    // })();

    //mostrar mais - página resultados
    (function(){
        var item = $(".resultado .item-busca"),
        mostrar_mais = $(".resultado .mostrar-mais"),
        quantidade_itens = item.length,
        limite = 8,
        limite_index = limite - 1;

        function limitar_itens(num_limite) {
            item.each(function(a, b){
                if(a > num_limite) {
                    $(this).addClass("esconder");
                }
            });
        }
        
        quantidade_itens > limite ? (
            mostrar_mais.removeClass("esconder"),
            limitar_itens(limite_index)
        ) : ( null )

        mostrar_mais.on('click', function(){
            var link = $(this).find(".link"),
            texto_botao = link.hasClass("mais");

            texto_botao ? (
                link.removeClass("mais").addClass("menos").text("Mostrar menos"),
                item.removeClass("esconder")
             ) : (
                link.removeClass("menos").addClass("mais").text("Mostrar mais"),
                limitar_itens(limite_index)
             )
        });

    })();
});

// $(function(){
//     let largura = $("owl-item:first").width();
//     let altura = $("owl-item:first").height();
//     alert(altura)
//     alert(largura)
//     $(".video-img").width(largura);
//     $(".video-img").height(altura);
//  });