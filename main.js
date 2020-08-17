(function() {
	'use strict';

	var vm = new Vue({
		el: '#app',
		data: {
			newItem: '',
			todos: []
		},
		//データの保持（リロードしてもリセットしない）
		watch: { //データ変更の監視
			todos: {
				handler: function() {
					//localStorage.setItem('キー', 値) これはJavaScript の文
					//JSON.stringify() jsonの配列を文字列にデコードする
					localStorage.setItem('todos', JSON.stringify(this.todos));
					//alert('Data saved!');
				},
				deep: true
			}
		},
		//リロードした際のデータ呼び出し
		mounted: function() {
			//JSON.parse() json文字列をJSのjsonオブジェクトに変換
			//「|| []』でデータがなかった場合に空配列にする
			this.todos = JSON.parse(localStorage.getItem('todos')) || [];
		},
		methods: {
			addItem: function(e) {
				//画面遷移を防止
				e.preventDefault();
				var item = {
					title: this.newItem,
					isDone: false
				};
				this.todos.push(item);
				//登録後にフォームの値をクリアする
				this.newItem = '';
			},
			deleteItem: function(index) {
				if (confirm('are you sure ?')) {
					//splice 配列の要素を操作するメソッド
					//今回はindex番目から1個の要素を取り除いている
					this.todos.splice(index, 1);
				}
			},
			//完了したtodoを一括削除
			purge: function(index) {
				if (!confirm('delete finished ?')) {
					//キャンセルの時
					return;
				}
				//OKの時
				this.todos = this.todos.filter(function(todo) {
					return !todo.isDone;　//未完了のものだけ表示させる
				});
			}
		},
		computed: {
			remaining: function() {
				var items = this.todos.filter(function(todo) {
					return !todo.isDone;
				});
				return items.length;
			}
		}
	});
})();