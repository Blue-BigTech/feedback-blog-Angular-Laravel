<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\templateTabs;
use App\Models\SplitAreas;
use App\Models\ActionHistory;
use DB;
class templateController extends Controller
{
    public function CreateTemplateTab(Request $request) {
        $tab = templateTabs::create($request->all());
        return response()->json($tab);
    }

    public function CreateActionHistory(Request $request) {
        $hist = ActionHistory::create($request->all());
        return response()->json($hist);
    }

    public function initSplitArea(Request $request) {
        //return $request->all();
        $splitArea = SplitAreas::create($request->all());
        return response()->json($splitArea);
    }

    public function getUserTemplateTabs($id) {
        $tabs = DB::table('template_tabs')->where('user_id', '=', $id)->where('status', '=', true)->orderBy('order')->get();
        //return response()->json($tabs);
        return response()->json($tabs);
    }

    public function getSplitArea($id) {
        $splitArea = DB::table('split_areas')->where('tab_id', '=', $id)->get();
        return response()->json($splitArea);
    }

    public function getActionHistory($id) {
        $histories = DB::table('action_histories')->where('user_id', '=', $id)->get();
        return response()->json($histories);
    }

    public function deleteTemplateTab(Request $request) {
        //$tab = templateTabs::find($request->id);
        //$tab->delete();
        $id = $request->id;
        $tab = templateTabs::where('_id', '=', $id)->update(['status' => false]);
        return response()->json(['message' => 'Tab deleted successfully'], 200);
    }

    public function updateTabName(Request $request) {
        $id = $request->id;
        $name = $request->name;

        $tab = templateTabs::where('_id', '=', $id)->update(['name' => $name]);
        return response()->json(['message' => 'Tab name updated successfully'], 200);
    }

    public function updateTabOrder(Request $request) {
        $id = $request->id;
        $order = $request->order;

        $tab = templateTabs::where('_id', '=', $id)->update(['order' => $order]);
        return response()->json(['message' => 'Tab order updated successfully'], 200);
    }

    public function updateTabSplits(Request $request) {
        //return $request->id;
        $id = $request->input('_id');
        $tab_id = $request->tab_id;
        $columns = $request->columns;

        $split = SplitAreas::where('_id', '=', $id['$oid'])->where('tab_id', '=', $tab_id)->update(['columns' => $columns]);
        return response()->json(['message' => 'Your window splitted successfully'], 200);
    }

    public function setSelectedRouterLink(Request $request) {
        $split = SplitAreas::where('tab_id', '=', $request->tab_id)->get();
        return response()->json($split);
    }
}
