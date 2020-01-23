'use strict';

{
    const btn= document.getElementById('btn');

    btn.addEventListener('click', ()=>{
        // const results =["大吉","大吉","大吉","大吉","小吉","凶"];
        // const n =Math.floor(Math.random()*results.length)
        // btn.textContent= results[n];
        const n=Math.random();
        if (n<0.05){
            btn.textContent="大吉";//5%
        }else if(n<0.2) {
            btn.textContent="中吉";//15%       
        }else{
            btn.textContent="凶";
        }
        
        
        // switch(n){
        //     case 0:
        //     btn.textContent="大吉";
        //     break;
        //     case 1:
        //     btn.textContent="中吉";
        //     break;
        //     case 2:
        //     btn.textContent="小吉";
        // break;
        // }

    });
    btn.addEventListener('mousedown', ()=>{
        btn.classList.add('pressed')
    });
    btn.addEventListener('mouseup', ()=>{
        btn.classList.remove('pressed');
    });



    ///////////////////////////////////////////////////////


    //タイピングされるワード
    const words =[
        'apple',
        'sky',
        'blue',
        'yellow',
        'let',

    ];
    let word; //打ち込む値 //[Math.floor(Math.random()*変数.lenght)]で変数からランダムに選択する
    let loc ; // mojicount変数
    let score; //打ち込んで正解の変数
    let miss;  //打ち込んで失敗の変数

    const timerLimit=20*1000; //3 minutes
    let startTime;       //Date.now()を受け取るための変数
    let isPlaying=false; //updatatimerがはしらないようにする変数、まだゲームが始まっていないため中身はfales;

    const target =document.getElementById('target');
    const scoreLabel=document.getElementById('score');
    const missLabel =document.getElementById('miss');
    const timerLabel =document.getElementById('timer');
    //正答率を表示する関数
    function showResult(){
        const accuracy =score+miss ===0 ? 0 :score/(score+miss)*100;//(score+miss)=0の場合計算できないので条件式(score+miss)===0（なら）？ 0とする
        alert(`${score} letters, ${miss} misses,${accuracy.toFixed(2)}% accuracy!`);
    }
    
    //タイピングをする時に動かす関数
    function updateTarget(){
        let placeholder='';// 空文字列
        for (let i=0; i<loc; i++ ){
            placeholder += '_';
        }
        target.textContent=placeholder+word.substring(loc); //部分文字列取得substring
    }

    //タイマーを動かす関数
     function updateTimer(){
        const timeLeft =startTime +timerLimit-Date.now();
        timerLabel.textContent=(timeLeft/1000).toFixed(2);//toFixedで少数点第二桁まで表示
        const timeoutId=setTimeout(() => {
            updateTimer()
        },10);
        if(timeLeft<0){
            isPlaying=false;//Game overが完了した時起動
            clearTimeout(timeoutId);
            setTimeout(() => {
                showResult();//正答率を表示
            }, 100);
            timerLabel.textContent='0.00';//タイマーが小数点以下をよみこんでしまうので[0.01や-0.01と表記されてしまうtimerLabelに0.00を表記する
            target.textContent='click to replay';
        }
    }
    const btn2= document.getElementById('btn2');

    //クリックするとタイピングがスタートする
    btn2.addEventListener('click',()=>{
        //ゲームが始まった場合クリックしてもupdatetimerが走らないようする条式件
        if(isPlaying===true){
            return;
        }
        isPlaying=true;//ゲームが始まっていない場合は始まったことにするために
        loc =0;
        score=0;
        miss=0;
        scoreLabel.textContent=score;
        missLabel.textContent=miss;
        word=words[Math.floor(Math.random()*words.length)];

        updateTarget();//タイピングための関数起動
        startTime =Date.now();//クリックされた時点からスタート
        updateTimer();//タイマーの関数起動
    })
        //windows上でタイピングができるようにする
    window.addEventListener('keyup',e =>{
        //クリックしていない状態でタイピングするとゲームが開始してしまうため、クリックした場合のみゲームが開始するための条件式
        if(isPlaying!==true){
            return;
        }
        if (e.key ===word[loc]){
            loc++;
            //文字のタイピング終了後次の文字に移動する条件式
            if(loc===word.length){
                word =words[Math.floor(Math.random()*words.length)]
                loc=0;
            }
            score++;
            scoreLabel.textContent=score;
            updateTarget();
               }else{
            miss++;
            missLabel.textContent=miss;
        }
    });
    ///////////////////////////////////////////timer js

const timer1=document.getElementById('timer1');
const start=document.getElementById('start');
const stop=document.getElementById('stop');
const reset=document.getElementById('reset');

let startTime1;
let timeoutId1;
let elapsedTime=0; //初期値を０にしとかないと値が読み込まれない

function countUp(){
    const d=new Date(Date.now()-startTime1+elapsedTime);
    const m=d.getMinutes();
    const s =d.getSeconds();
    const ms=d.getMilliseconds();
    //padStartは新たにjavascriptに組み込まれたメソッド padstartは文字列にしかつかえないため先頭にStringで文字列にしてあげる
    timer1.textContent=`${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}.${String(ms).padStart(3,'0')}`;

    timeoutId1 = setTimeout(()=>{
        countUp();
    },10);
}
//３つの条件を埋め込むstart.disabled=trueならstartボタンはおせない
//初期条件ではstart.on stop.off reset.offという状態
//buttonタグのCSS変更ができないためdivタグに変更しdivタグにbuttonのクラスを持たせて、CSSをONとOFFで変更させるイベント追加（bootstrapの場合はdiabled）
    function setButtonStateInitial(){
        start.classList.remove('inactive');
        stop.classList.add('inactive')
        reset.classList.add('inactive')
    }
    function setButtonStateRunning(){
        start.classList.add('inactive')
        stop.classList.remove('inactive');
        reset.classList.add('inactive')
    }
    function setButtonStateStoppoed(){
        start.classList.remove('inactive');
        stop.classList.add('inactive')
        reset.classList.remove('inactive');

    }
    //初期状態はstartしか押せない
    setButtonStateInitial();
    //startをクリックしたときのイベント
    start.addEventListener('click',()=>{
        //inactiveクラスがついている場合以降の処理はしたいための条件式
        if(start.classList.contains('inactive')===true){
            return;
        }
        setButtonStateRunning();
        startTime1=Date.now();
        countUp();
    });
    //stopをクリックしたときのイベント
    stop.addEventListener('click',()=>{
        //inactiveクラスがついている場合以降の処理はしたいための条件式
        if(stop.classList.contains('inactive')===true){
            return;
        }
        setButtonStateStoppoed();//bottonの表示条件
        clearTimeout(timeoutId1);//timeoutId1をクリアにする
        elapsedTime += Date.now() - startTime1; //これは elapsedTime が直近のタイマーが走っていた時間しか保持していないからなので、こちらを += としてあげて、タイマーが走っていた時間を全て足しあげるようにしてあげれば OK 

        
    });
    //resetをクリックしたときのイベント
    reset.addEventListener('click',()=>{
        //inactiveクラスがついている場合以降の処理はしたいための条件式
        if(reset.classList.contains('inactive')===true){
            return;
        }
        setButtonStateInitial();//bottonの表示条件
        timer1.textContent='00:00.000';
        elapsedTime=0;// これがないとスタート→ストップ→リセットした場合にタイマーにデータが残りストップした状態からカウントされてしまう
    });


    //////////////////////////////////////////// qusetion js
     const qusetion=document.getElementById('qusetion');
     const next=document.getElementById('next');
     const choices=document.getElementById('choices');
     const result=document.getElementById('result');
     const scoreLabel1=document.querySelector('#result>p');

     const quizSet=[
    //      {q: 'What is A?', c:['A0','A1','A2']},
    //      {q: 'What is B?', c:['B0','B1','B2']},
    //      {q: 'What is C?', c:['C0','C1','C2']},
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: 'いま、何問目？', c: ['3問目', '4問目', '5問目']},
     ];
     let currentNum=0;
     let isanswerd;
     let score1=0;

     function shuffle(arr) {
        for (let i = arr.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [arr[j], arr[i]] = [arr[i], arr[j]];
        }
        return arr;
      }
    function checkAnswer(li){
        //正楽式(isanswerd===true)を（isanswerd）のみで表示できる。
        if(isanswerd===true){
            return;
        }
        isanswerd=true;
        if(li.textContent===quizSet[currentNum].c[0]){
            li.classList.add('correct')
            score1++;

        }else{
            li.classList.add('miss')
        }
        next.classList.remove('disabled');
    }
    function setQuiz(){
        isanswerd=false;
        qusetion.textContent=quizSet[currentNum].q;

      while (choices.firstChild){
          choices.removeChild(choices.firstChild);
      }

//フィッシャー・イェーツのシャッフル
//shuffle(quizSet[currentNum].c);だと選択肢の最初の要素を正解にしていたのに、こうやってシャッフルされると、あとで正誤判定ができなくなってしまいます。
//なぜこれが起きるかというと、配列やオブジェクトの変数がコピーされると値そのものではなくて、参照だけがコピーされるので shuffle() で値が変更されると、大本の配列も変更されてしまうからです。
    const shuffledChoices =shuffle([...quizSet[currentNum].c]);//[...]スプレッド演算子
    //console.log(quizSet[currentNum].c)
    shuffledChoices.forEach(choice =>{
        const li = document.createElement('li');
        li.textContent=choice;
        li.addEventListener('click',()=>{
            checkAnswer(li);
        })
        choices.appendChild(li);
    });
    //最後の問題になったばあいにscoreを表示
    if(currentNum===quizSet.length-1){
        next.textContent='show score';
    }
}
    setQuiz();
    next.addEventListener('click', ()=>{
        //
        if(next.classList.contains('disabled')){
            return;
        }
        next.classList.add('disabled');
        if(currentNum===quizSet.length-1){
            // console.log(`Score: ${score1}/${quizSet.length}`);
            scoreLabel1.textContent=`Score: ${score1}/${quizSet.length}`
            result.classList.add('show');
        }else{
            currentNum++;
            setQuiz();
        }
       
    });



    ////////////////////////panel js
    //＜HTML>作成classでCSSを読み込む
    class Panel {
        constructor(){
            const div =document.createElement('div');
            div.classList.add('panel');
            div.classList.add('row')

            this.img=document.createElement('img');
            this.img.src=this.getRandomImage();

            this.timeoutId =undefined;

            this.stop=document.createElement('div');
            this.stop.textContent="Stop";
            this.stop.classList.add('stop','inactive');
            this.stop.addEventListener('click',()=>{
                stop.classList.add('inactive');
                if(this.stop.classList.contains('inactive')){
                    return;
                }
                this.stop.classList.add('inactive');
                clearTimeout(this.timeoutId);
                panelsleft--;
                if(panelsleft===0){
                    checkResult();
                    spin.classList.remove('inactive');
                    panelsleft=3;
                }
            })

            div.appendChild(this.img);
            div.appendChild(this.stop);

            const main1 =document.querySelector('main1');
            main1.appendChild(div);

                    } 
                //スロットの画像
            getRandomImage(){
                const images=[
                    'img/seven.png',
                    'img/bell.png',
                    'img/cherry.png'
                    ];
                    return images[Math.floor(Math.random()*images.length)];
            }
            //spinを押すとシャフルが始まる
            spin(){
                this.img.src=this.getRandomImage();
                this.timeoutId=setTimeout(()=>{
                    this.spin();
                },50);
            }
                //二つ揃うと同じ場合の動き
            isUnmatched(p1,p2){
                // if(this.img.src !==p1.img.src && this.img.src !== p2.img.src){
                // return true;        
                // }else{
                //     return false;
                    
                // }
                return this.img.src !== p1.img.src && this.img.src !== p2.img.src;
                        }

            unmatch(){
                this.img.classList.add('unmatched')
            }
                //ゲームが終了してもう一度ゲームする
            activate(){
                this.img.classList.remove('unmatched');
                this.stop.classList.remove('inactive');
            }
                }
                function checkResult(){
                    if(panels[0].isUnmatched(panels[1],panels[2])){
                        panels[0].unmatch();
                    }
                    if(panels[1].isUnmatched(panels[0],panels[2])){
                        panels[1].unmatch();
                    }
                    if(panels[2].isUnmatched(panels[0],panels[1])){
                        panels[2].unmatch();
                    }
                }

        const panels =[

            new Panel(),
            new Panel(),
            new Panel(),
        ];

        let panelsleft=3;

        const spin =document.getElementById('spin');
        spin.addEventListener('click',()=>{
            spin.classList.add('inactive');
            if(spin.classList.contains('inavtive')){
                return;
            }
            panels.forEach(panel=>{
                panel.activate();//
                panel.spin();
            });
        })

}
