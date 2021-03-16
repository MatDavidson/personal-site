//Author: Mathieu Davidson
//Simple generic CDLL in Javascript

class CircularLinkedList{
    constructor(){
        this.count = 0;
        this.head = null;
        this.tail = null; 
        this.current = null;
    }
    
    //Insert a a new item into the list as the tail node.
    add(item){
        let n = new Node(item);

        if(this.count === 0){
            //In an empty list, make the new node the head and have it point to itself
            this.head = n;
            this.head.next = n;
            this.head.prev = n;

            this.tail = this.head;
            this.tail.next = this.head;
            this.tail.prev = this.head;

            this.current = this.head;

        }
        else if(this.count === 1){
            //List with one element, make the new node the tail. Tail's next and prev is head and vice virsa
            this.tail = n;
            this.head.next = this.tail;
            this.head.prev = this.tail;

            this.tail.next = this.head;
            this.tail.prev = this.head;

            this.current = this.tail;
        }
        else { 
            //List with more one item, make a place holder for the old tail, have its next point to the new node, make the new node the tail.
            let oldTail = this.tail;  
            this.tail.next = n;
            this.tail = n;

            //New tail's next is head, prev is the old tail
            this.tail.prev = oldTail;
            this.tail.next = this.head;

            //Have the head's prev point to the new tail
            this.head.prev = this.tail;
            this.current = this.tail;
            
        }
        this.count++;
    }

    //Removes the first occurence of the item and returns its position or -1 if unfound
    //this should probably be implemented a little differently
    remove(item){
        if(this.count === 0)
            return -1;

        else if(this.count === 1){
            //When removing the only item in the list, set everything to null
            this.head = null;
            this.tail = null;
            this.current = null;
            this.count--;
            return 0;
        }
        else{
            //Removing from a list with more than 1 element, find the position of the node and traverse to it
            let i = this.find(item);
            if(i > -1){
                this.current = this.head;
                for(let j = 0; j < i; j++){
                    this.current = this.current.next;
                }
                
                //Fix the pointers of the next and previous nodes to cut out the desired node
                this.current.next.prev = this.current.prev;
                this.current.prev.next = this.current.next;

                //Check if the node was the head or tail and fix accordingly
                if(this.current === this.head)
                    this.head = this.current.next;
                if(this.current === this.tail)
                    this.tail = this.current.prev;
                this.count--;
                this.current = this.current.next;
            }
            return i;
        }
    }

    //This method will take a node, datum or other object and return its position or -1 if unfound
    find(item){
        if(this.count > 0){
            this.current = this.head;
            for(let i = 0; i < this.count; i++){
                if(item instanceof Node){
                    if(this.current.item === item.item)
                      return i;
                }
                else{
                    if(this.current.item === item)
                      return i;
                }
                this.current = this.current.next;
            }
        }
        return -1;
    }

    print(){
        console.log("Printing in order...");
        this.current = this.head;
        for(let i=0;i<this.count;i++){
            console.log("Node: " + i + ", Item: " + this.current.item);
            this.current = this.current.next;
        }
    }

    reversePrint(){
        console.log("Printing in reverse...");
        this.current = this.tail;
        for(let i=this.count-1;i>=0;i--){
            console.log("Node: " + i + ", Item: " + this.current.item);
            this.current = this.current.prev;
        }
    }

    nextNode(){
        this.current = this.current.next;
    }

    prevNode(){
        this.current = this.current.prev;
    }
}



function Node(item){
        this.item = item;
        this.next = null;
        this.prev = null;
}

export{CircularLinkedList,Node};