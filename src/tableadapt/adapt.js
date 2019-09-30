function calcHeight(that,father,brother){
let $fatherHeight = $(father).height();
let $brothersHeight  = 0;
if(typeof brother === "object"){
  for(let i in brother){
    $brothersHeight += $(brother[i]).height()
    
  }
}


  that.maxHeight = $fatherHeight-$brothersHeight-20
}

export default {
  changeTable(that,father,brother){
    calcHeight(that,father,brother);
    $(window).resize(function() {//动态监听监听网页窗口变化
      calcHeight(that,father,brother)
  });
  }
}
