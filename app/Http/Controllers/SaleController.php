<?php

namespace App\Http\Controllers;

use App\Client;
use App\Sale;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class SaleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function lista(){
        return view('sales.index');
    }
    public function index()
    {


        $datos = DB::table('sales')
            ->join('products', 'products.id', '=', 'sales.product_id')
            ->join('clients', 'clients.id', '=', 'sales.client_id')
            ->select('sales.id','sales.quantity','sales.date_sale','sales.price','sales.state',
                'products.barcode','products.name',
                'clients.ci as client')->orderBy('sales.id', 'desc')
            ->get();


        return $datos;
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        if ($request->ci!=null){
            //busacar datos del cliente
            $datocliente=DB::table('clients')->where('ci', $request->ci)->get()->first();
            if ($datocliente!=null){

                foreach ($request->sales as $dato){
                    $datoproduct=DB::table('products')->where('barcode', $dato['product'])->get()->first();
                    DB::table('sales')->insert([
                        'quantity'=>$dato['quantity'],
                        'client_id'=>$datocliente->id,
                        'product_id'=>$datoproduct->id,
                        'date_sale'=>now(),
                        'price'=>$datoproduct->price * $dato['quantity'],
                        'state'=>'vendido'
                    ]);
                    $stock= DB::table('expirations')->where('product_id',$datoproduct->id)
                        ->where('expiration_date','>=', NOW())
                        ->orderBy('expiration_date','asc')->first();
                    DB::table('expirations')->where('id',$stock->id)->update(['stock'=>$stock->stock-$dato['quantity']]);

                }

            }else{
                $product=Client::create($request->all());

                foreach ($request->sales as $dato){
                    $datoproduct=DB::table('products')->where('barcode', $dato['product'])->get()->first();
                    DB::table('sales')->insert([
                        'quantity'=>$dato['quantity'],
                        'client_id'=>$product->id,
                        'product_id'=>$datoproduct->id,
                        'date_sale'=>now(),
                        'price'=>$datoproduct->price * $dato['quantity'],
                        'state'=>'vendido'
                    ]);
                    $stock= DB::table('expirations')->where('product_id',$datoproduct->id)
                        ->where('expiration_date','>=', NOW())
                        ->orderBy('expiration_date','asc')->first();
                    DB::table('expirations')->where('id',$stock->id)->update(['stock'=>$stock->stock-$dato['quantity']]);

                }

            }
        }else{
            foreach ($request->sales as $dato){
                $datoproduct=DB::table('products')->where('barcode', $dato['product'])->get()->first();
                DB::table('sales')->insert([
                    'quantity'=>$dato['quantity'],
                    'client_id'=>'1',
                    'product_id'=>$datoproduct->id,
                    'date_sale'=>now(),
                    'price'=>$datoproduct->price * $dato['quantity'],
                    'state'=>'vendido'
                ]);
                $stock= DB::table('expirations')->where('product_id',$datoproduct->id)
                    ->where('expiration_date','>=', NOW())
                    ->orderBy('expiration_date','asc')->first();
                DB::table('expirations')->where('id',$stock->id)->update(['stock'=>$stock->stock-$dato['quantity']]);

            }
        }


















        //            for ($i=0;$i<$request->total;$i++){
//                DB::table('sales')->insert(['product' => $request->sales[$i]['product'], 'quantity' => $request->sales[$i]['quantity']]);
//            }
//





        //$product=Client::create($request->all());

        return ;
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function show(Sale $sale)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function edit(Sale $sale)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Sale $sale)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Sale  $sale
     * @return \Illuminate\Http\Response
     */
    public function destroy(Sale $sale)
    {
        //
    }
}
