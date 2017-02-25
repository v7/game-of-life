import React, { Component } from 'react';


class Playground extends Component {

  constructor(props){

    super(props)
      this.state={
        cells:this.genRandom(),
            stop:false,
            genCount:0

      }

  }

  componentDidMount() {

    setTimeout(()=>{this.gen(3,3)},1000)

  }

  checkNeighbours =(row,col)=>{
    var r= row
    var c= col
    var n= 0
    // vars to check overlaping
    var topSide=false
    var bottomSide=false
    var leftSide=false
    var rightSide=false
  const lengthOfRow=this.state.cells.length
  const lengthOfCol=this.state.cells[r].length


    for (let i = r-1;i<=r+1;i++){

      if(i<0){
        i=lengthOfRow-1
        topSide=true
      }

      if(i>=lengthOfRow){
        i=0
        bottomSide=true
      }

              for(let x=c-1;x<=c+1;x++){

                if(x<0){
                  x=lengthOfCol-1
                  rightSide=true
                }

                if(x>=lengthOfCol){
                  x=0
                  leftSide=true
                }

                if(i===r&&x===c){
                    console.log("skpping the cell")
                }else{
                  if(this.state.cells[i][x]){
                    n++
                  }
                }

                if(rightSide){
                  x=-1
                  rightSide=false
                }

                if(leftSide){
                  x=lengthOfCol+2
                  leftSide=false
                }

              }


        if(topSide){
          i=-1
          topSide=false
        }

        if(bottomSide){
          i=lengthOfRow+2
          bottomSide=false
        }

    }

    return n

  }


  gen = ()=>{

    if(this.state.stop===false){
    let thereIsGen =0
    var newGen=this.state.cells.map((r,ri)=>{

      return r.map((c,ci)=>{

        var neighbours = this.checkNeighbours(ri,ci)

        var result

              if(neighbours===3){
              thereIsGen+=1
              return 1

            }else if(this.state.cells[ri][ci]===1&&neighbours===2){
              thereIsGen+=1
              return 1
            }else{

              return 0
            }
      })
    })


          this.setState({
            cells:newGen,
              genCount:this.state.genCount+1

          })

          if(thereIsGen>0){

          setTimeout(()=>{



            this.gen()

          },200)

        }else{

          this.setState({

            genCount:0

          })


        }





      }







return newGen


  }


  stop= ()=>{


    this.setState({stop:true})


  }


  run =()=>{
    console.log("start")
    this.setState({stop:false},()=>{ this.gen()})


  }

  clear = ()=>{

    let cells = this.state.cells.map((r,ri)=>{

      return r.map((c,ci)=>{

        return 0

  })
})


  this.setState({cells})
}

  addCell=(r,c)=>{


    let newSet = this.state.cells
    newSet[r][c]=newSet[r][c]?0:1

    this.setState({cells:newSet})


  }

  genRandom=()=>{

    let cells = [
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
          [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]

        ].map((r,ri)=>{

          return r.map((c,ci)=>{

            return Math.random() < 0.5 ? 0 : 1;


      })
    })

    return cells


  }



  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render(){
        var row = this.state.cells.map((R,RI)=>{
          var col = R.map((C,CI)=>{
            return( <span key={RI+''+CI} className={(C?'alive':'dead')+" cell"} onClick={()=>{this.addCell(RI,CI)}}></span>)
          })
          return (<div key={RI} className="row">{col}</div>)
        })

    return (
        <div className="Component">
        <div className="playground">
          {row}

        </div>


          <button onClick={()=>{this.stop(true)}}>stop</button>
          <button onClick={()=>{this.run(false)}}>start</button>
            <button onClick={this.clear}>clear</button>
          <h3>{this.state.genCount}</h3>

        </div>
    )

  }


}


export default Playground
